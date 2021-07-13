/* eslint-disable react/prop-types */
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const CustomLink = (props: any) => {
  const {
    to,
    className,
    activeClassName,
    children,
    ...otherProps
  } = props;
  const { asPath } = useRouter();
  const containerClassName = asPath === otherProps.href
    || asPath === otherProps.as ? `${className} ${activeClassName}`.trim() : className;

  const regex = new RegExp('^http', 'i');
  const path = to || otherProps.href;
  const isExternal = path ? regex.test(path) : false;
  const actualProps = {
    ...otherProps,
  };

  const Child = 'a';

  const childProps: any = { className: containerClassName };

  if (actualProps?.target) {
    childProps.target = actualProps.target;
    delete actualProps.target;
  }

  if (isExternal) {
    childProps.href = path;
  }

  if (path && !isExternal) {
    actualProps.href = path;
    if (children.type === 'a') {
      actualProps.passHref = true;
    }
    return React.createElement(Link, actualProps, <Child {...childProps}>{children}</Child>);
  }
  return React.createElement(Child, { ...actualProps, ...childProps }, children);
};

export default CustomLink;
