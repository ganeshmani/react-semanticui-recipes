import React from "react";
import { Card, Image, Icon, Grid } from "semantic-ui-react";
const MealCard = ({ imageUrl, title, onClick }) => {
  return (
    <Card onClick={onClick}>
      <Image src={imageUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        {/* <Card.Meta>
          <span className="date">{type}</span>
        </Card.Meta> */}
        {/* <Card.Description>
          Matthew is a musician living in Nashville.
        </Card.Description> */}
      </Card.Content>
    </Card>
  );
};

export default MealCard;
