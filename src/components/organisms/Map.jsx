// /* eslint-disable no-unused-vars */
// import React, { useEffect, useRef, useState } from "react";
// import loadScript from "../../utilities/loadScript";

// const center = { lat: -1.939826787816454, lng: 30.0445426438232 };
// const stopA = { lat: -1.9365670876910166, lng: 30.060163829002217 };
// const stopB = { lat: -1.9358808342336546, lng: 30.08024820994666 };
// const stopC = { lat: -1.9489196023037583, lng: 30.092607828989397 };
// const stopD = { lat: -1.9592132952818164, lng: 30.106684061788073 };
// const stopE = { lat: -1.9487480402200394, lng: 30.126596781356923 };
// const end = { lat: -1.9365670876910166, lng: 30.13020167024439 };

// const waypoints = [
//   { location: stopA, stopover: true },
//   { location: stopB, stopover: true },
//   { location: stopC, stopover: true },
//   { location: stopD, stopover: true },
//   { location: stopE, stopover: true },
// ];

// const MapWithRoute = () => {
//   const mapRef = useRef(null);
//   const directionsServiceRef = useRef(null);
//   const directionsRendererRef = useRef(null);
//   const [driverMarker, setDriverMarker] = useState(null);
//   const [currentPosition, setCurrentPosition] = useState(null);
//   const [eta, setEta] = useState(null);
//   const [distance, setDistance] = useState(null);

//   const averageSpeedKmh = 60;

//   useEffect(() => {
//     const loadGoogleMaps = async () => {
//       try {
//         await loadScript(
//           `https://maps.googleapis.com/maps/api/js?key=AIzaSyCXJYPftqbrbSxG5Bo13RV8QlLNBd_rblE&libraries=geometry`
//         );
//         if (window.google) {
//           console.log("Google API loaded");
//           const google = window.google;

//           const map = new google.maps.Map(mapRef.current, {
//             center: center,
//             zoom: 7,
//           });

//           directionsServiceRef.current = new google.maps.DirectionsService();
//           directionsRendererRef.current = new google.maps.DirectionsRenderer();
//           directionsRendererRef.current.setMap(map);

//           const request = {
//             origin: center,
//             destination: end,
//             waypoints,
//             travelMode: google.maps.TravelMode.DRIVING,
//           };

//           directionsServiceRef.current.route(request, (result, status) => {
//             if (status === google.maps.DirectionsStatus.OK) {
//               directionsRendererRef.current.setDirections(result);
//             } else {
//               console.error(`Directions request failed due to ${status}`);
//             }
//           });

//           // Real-time location tracking
//           if (navigator.geolocation) {
//             navigator.geolocation.watchPosition(
//               (position) => {
//                 const { latitude, longitude } = position.coords;
//                 const currentLocation = new google.maps.LatLng(
//                   latitude,
//                   longitude
//                 );

//                 if (!driverMarker) {
//                   const marker = new google.maps.marker.AdvancedMarkerElement({
//                     position: currentLocation,
//                     map: map,
//                     title: "Current Location",
//                   });
//                   setDriverMarker(marker);
//                 } else {
//                   driverMarker.setPosition(currentLocation);
//                 }

//                 map.setCenter(currentLocation);

//                 // Calculate ETA to the next waypoint
//                 calculateEta(currentLocation);
//               },
//               (error) => {
//                 console.error("Error getting current position:", error);
//               },
//               {
//                 enableHighAccuracy: true,
//                 maximumAge: 0,
//                 timeout: 10000,
//               }
//             );
//           } else {
//             console.error("Geolocation is not supported by this browser.");
//           }
//         } else {
//           console.log("Google API not called");
//         }
//       } catch (error) {
//         console.error("Error loading Google Maps script:", error);
//       }
//     };
//     loadGoogleMaps()
//   }, [driverMarker]);

//   const calculateEta = (currentLocation) => {
//     if (currentLocation && window.google) {
//       const google = window.google;
//       console.log(waypoints);

//       const nextStop = waypoints.find((waypoint) => {
//         return (
//           google.maps.geometry.spherical.computeDistanceBetween(
//             currentLocation,
//             waypoint
//           ) > 0
//         );
//       });

//       if (nextStop) {
//         const distance = google.maps.geometry.spherical.computeDistanceBetween(
//           currentLocation,
//           nextStop
//         );
//         const distanceKm = distance / 1000; // Convert to kilometers
//         const timeHours = distanceKm / averageSpeedKmh;
//         const timeMinutes = Math.round(timeHours * 60); // Convert to minutes

//         setEta(timeMinutes);
//         setDistance(distanceKm);
//       }
//     }
//   };

//   return (
//     <div>
//       <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />
//     </div>
//   );
// };

// export default MapWithRoute;
