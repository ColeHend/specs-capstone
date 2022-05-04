import React from "react";

import Collapsible from "react-collapsible";
function LocationsCollection(props) {
  const { myLocations } = props;
  const { markers, setMarkers } = props.markers;
  const { placeMark, setPlaceMark } = props.placeMark;
  const setLocationHandle = (e, location) => {
    setMarkers([
      ...markers,
      {
        id: location.location_id,
        x: placeMark.x,
        y: placeMark.y,
      },
    ]);
  };
  return (
    <div>
      {myLocations.map((location) => (
        <Collapsible
          key={location.title}
          openedClassName="locationMapCollapse"
          contentOuterClassName="locationMapCollapseOuter"
          contentInnerClassName="locationMapCollapseInner"
          className="locationMapCollapse"
          trigger={<LocationTitle location={location} />}
        >
          <div>
            <button onClick={(e) => setLocationHandle(e, location)}>
              Set Location
            </button>
          </div>
          <div>{location.location_desc}</div>
        </Collapsible>
      ))}
      <div>{JSON.stringify(myLocations)}</div>
    </div>
  );
}
function LocationTitle(props) {
  const { title } = props.location;
  return (
    <div>
      <span>{title}</span>
    </div>
  );
}
export default LocationsCollection;
