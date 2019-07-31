import React from "react";
import { Link } from "react-router-dom";

const GridList = props => {
  const { data, gridClassName } = props;
  const list = data.map(item => (
    <Link key={item.id} to={`/artists/${item.id}`}>
      <div>
        <img src={item.images[1].url} alt="Headshot" />
      </div>
    </Link>
  ));
  return <div className={gridClassName}>{list}</div>;
};

export default GridList;
