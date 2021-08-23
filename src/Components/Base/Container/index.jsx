import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Container = forwardRef(({ children, ...others }, ref) => (
  <div ref={ref} {...others}>
    {children}
  </div>)
);

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;