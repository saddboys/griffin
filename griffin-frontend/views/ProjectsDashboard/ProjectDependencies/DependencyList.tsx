/**
 * List to display dependencies, could theoretically be used to display projects or vulnerabilities as well
 * by Chuyang Chen
 */

import React, {FunctionComponent, useState} from 'react';
import {List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import {Box} from "@mui/system";

interface Props {
  items: Array<Dependency>,
  onSelect: (item: Dependency) => void
}

// todo this is deprecated/unused
//  - saving this in case it is needed for a later sprint
const DependencyList: FunctionComponent<Props> = (props) => {

  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    item: Dependency
  ) => {
    setSelectedIndex(index);
    props.onSelect(item);
  };

  const renderItems = () => {
    return props.items.map((item, index) => {
      return (
        <Box>
          <ListItem>
            <ListItemButton
              selected={selectedIndex === index}
              onClick={(event) =>
                handleListItemClick(event, index, item)}>
              <ListItemText primary={item.name}/>
            </ListItemButton>
          </ListItem>
        </Box>);
    });
  };

  return (
    <Box>
      <List sx={{
        position: 'relative',
        overflow: 'auto',
        maxHeight: '75%',
      }}>
        {renderItems()}
      </List>
    </Box>

  );
};

export default DependencyList;
