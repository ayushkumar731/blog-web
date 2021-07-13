/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import parseRouter from '@/utils/parseRouter';
import { withStyles } from '@material-ui/core/styles';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import {
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import load from '@/utils/load';
import { creatBlog, ImageUpload, updateBlog } from '@/services/Blog/index';
import styles from '@/components/CreateNewBlogForm/styles';

const TextEditor = load(() => import('@/components/TextEditor'), {
  ssr: false,
});

const FormModal = (props) => {
  const router = useRouter();
  const { classes, editData } = props;
  const fileInput = React.createRef();

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    details: '',
    shortDescription: '',
    metaDescription: '',
    timeToReadInmin: 0,
    editorState: EditorState.createEmpty(),
  });

  useEffect(
    () => {
      if (editData) {
        const blocksFromHtml = htmlToDraft(editData.details);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);
        setFormData({
          title: editData.title,
          image: editData.image,
          shortDescription: editData.shortDescription,
          metaDescription: editData.metaDescription,
          timeToReadInmin: editData.timeToReadInmin,
          editorState,
        });
      }
    },
    [editData],
  );

  const handleChangeForm = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const onAddClick = (e) => {
    e.preventDefault();
    if (fileInput.current) fileInput.current.click();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      image: '',
      shortDescription: '',
      metaDescription: '',
      timeToReadInmin: 0,
      editorState: EditorState.createEmpty(),
    });
  };

  const onEditorStateChange = (editorState) => {
    setFormData({
      ...formData,
      editorState,
    });
  };

  const handleFileUpload = ({ target }) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const block = e.target.result.split(';');
      const [, base64] = block;
      const [, realData] = base64.split(',');
      const result = await ImageUpload(realData);
      setFormData({
        ...formData,
        image: result.data.response,
      });
    };
    if (target instanceof HTMLInputElement) {
      const [file] = target.files;
      if (file && file.type !== 'image/jpeg' && file.type !== 'image/png') {
        return;
      }
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    const rawContentState = convertToRaw(formData.editorState.getCurrentContent());
    formData.details = draftToHtml(rawContentState);
    const { query, push } = parseRouter(router);
    let data;
    if (editData) {
      const blogId = query.slice(4);
      data = await updateBlog(formData, blogId);
    } else {
      data = await creatBlog(formData);
    }
    if (data.status === true) {
      if (editData) {
        const { slug } = data.data.response.doc;
        push(`/blog/${slug}`);
      }
      resetForm();
    }
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.container} direction="column">
        <Typography
          className={classes.heading}
        >
          {editData ? 'Edit Blog' : 'Create New Blog'}
        </Typography>
        <TextField
          id="title"
          label="Title"
          value={formData && formData.title}
          onChange={handleChangeForm}
          classes={{
            root: classes.title,
          }}
        />
        <TextField
          id="metaDescription"
          label="Meta Description"
          value={formData && formData.metaDescription}
          onChange={handleChangeForm}
          classes={{
            root: classes.title,
          }}
        />
        <TextField
          id="shortDescription"
          label="Short Description"
          value={formData && formData.shortDescription}
          onChange={handleChangeForm}
          classes={{
            root: classes.title,
          }}
        />
        <TextField
          id="timeToReadInmin"
          label="Time To Read In min"
          value={formData && formData.timeToReadInmin}
          type="number"
          onChange={handleChangeForm}
          classes={{
            root: classes.title,
          }}
        />
        <Grid container justify="space-between" alignItems="center">
          <TextField
            id="image"
            label="Image Url"
            value={formData && formData.image}
            classes={{
              root: classes.imageUrl,
            }}
            onChange={handleChangeForm}
          />
          <ImageIcon className={classes.imageIcon} onClick={onAddClick} />
          <input
            type="file"
            className={classes.fileInput}
            ref={fileInput}
            onChange={handleFileUpload}
          />
        </Grid>
        <Typography className={classes.subHeading}>Description</Typography>
        <TextEditor
          editorState={formData.editorState}
          onEditorStateChange={onEditorStateChange}
        />
        <Grid
          item
          container
          justify="center"
        >
          <Button
            classes={{
              root: classes.button,
              disabled: classes.buttonDisabled,
            }}
            onClick={handleSubmit}
            disabled={
              !formData
              || !formData.title
              || !formData.editorState
            }
          >
            {editData ? 'Save Change' : 'Save'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(withStyles(styles)(FormModal));
