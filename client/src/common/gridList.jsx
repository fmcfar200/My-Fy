import React from "react";
import { Link } from "react-router-dom";

const GridList = props => {
  const { data, gridClassName, routeName, showNames } = props;
  const list = data.map(item => (
    <Link key={item.id} to={`/${routeName}/${item.id}`}>
      <div>
        <img src={item.images[0].url} alt="Cover" />
        {showNames && (
          <div className="Info-Container">
            <label className="Name-Label">{item.name}</label>
            <div>
              <label className="Owner-Label">{item.owner.display_name}</label>
            </div>
          </div>
        )}
      </div>
    </Link>
  ));
  return <div className={gridClassName}>{list}</div>;
};

export default GridList;
