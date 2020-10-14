import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectDirectorySecitons } from '../../redux/directory/directory.selectors';

import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss'

const Directory = ({sections}) => {
  return (
    <div className='directory-menu'>
      {sections.map(({id, ...otherSectionProps }) => <MenuItem key={id} {...otherSectionProps} /> )} 
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySecitons
}); 

export default connect(mapStateToProps)(Directory);