import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import VenueList from "./VenueList";
import Header from "./Header";
//import React from "react"; react 17 den sonra ayrıca importa gerek yokmuş
import { useSelector, useDispatch } from "react-redux";
import VenueDataService from "../services/VenueDataService";
const Home = () => {
  const [coordinate, setCoordinate] = React.useState({
    lat: 1,
    long: 1,
  });
  const dispatch = useDispatch();
  const venues = useSelector((state) => state.data);
  const isError = useSelector((state) => state.isError);
  const isLoading = useSelector((state) => state.isLoading);
  const isSuccess = useSelector((state) => state.isSuccess);
  const search =(event)=>{
    setSearchVenue(event.target.value);
  };
  const[searchVenue,setSearchVenue]=useState("");
  const filteredVenues=Array.isArray(venues)? venues.filter(
    (venue)=>
      venue.name.toLowerCase().includes(searchVenue.toLowerCase()) ||
      venue.address.toLowerCase().includes(searchVenue.toLowerCase())
): [];
  

  React.useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setCoordinate({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      });
    }
  }, []);

  React.useEffect(() => {
    dispatch({ type: "FETCH_INIT" });
    VenueDataService.nearbyVenues(coordinate.lat, coordinate.long)
      .then(function (response) {
        dispatch({ type: "FETCH_SUCCESS", payload: response.data });
      })
      .catch(function () {
        dispatch({ type: "FETCH_FAILURE" });
      });
  }, [coordinate.lat, coordinate.long]);

  return (
    <div>
      <Header
        headerText="Mekanbul"
        motto="Civarınızdaki Mekanlarınızı Keşfedin!"
      />
      <InputWithLabel
        id="arama"
        label="Mekan Ara:"
        type="text"
        isFocused
        onInputChange={search}
        value={searchVenue}
      />
      <hr />
      <div className="row">
        {isError ? (
          <p>Hata var.</p>
        ) : isLoading ? (
          <p>Mekanlar Yükleniyor...</p>
        ) : (
          isSuccess && <VenueList venues={filteredVenues} />
        )}
      </div>
    </div>
  );
};

export default Home;
