import React from "react";
import { Link } from "react-router-dom";

const GridList = props => {
  const { data, gridClassName, routeName } = props;
  const list = data.map(item => (
    <Link key={item.id} to={`/${routeName}/${item.id}`}>
      <div>
        {item.images[0] === undefined ? (
          <img src="default_profile.png" alt="Cover" />
        ) : (
          <img src={item.images[0].url} alt="Cover" />
        )}
        <div className="Info-Container">
          <label className="Name-Label">{item.name}</label>
          {routeName === "playlist" && (
            <div>
              <label className="Owner-Label">{item.owner.display_name}</label>
            </div>
          )}
        </div>
      </div>
    </Link>
  ));
  return <div className={gridClassName}>{list}</div>;
};

export default GridList;
