import React, { Component } from 'react'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'
import { CubeGrid } from 'better-react-spinkit'
import { Link } from 'react-router-dom'
import './css/map.css'
const apiKey = 'AIzaSyCrode7wSxsfPX4IlbaVh2veVDC8ab0nRc'
class MapContainer extends Component {
  render () {
    return (
      <Map
        google={this.props.google}
        zoom={13}
        center={this.props.center}
        onReady={this.props.fetchPlaces}
      >
        {this.props.markers &&
          this.props.markers.map(marker => <Marker position={marker} />)}
      </Map>
    )
  }
}
MapContainer = GoogleApiWrapper({
  apiKey,
  LoadingContainer: CubeGrid
})(MapContainer)
class Maps extends Component {
  fetchPlaces = (mapProps, map) => {
    const { google } = mapProps
    const service = new google.maps.places.PlacesService(map)
    this.setState({ service, google })
  }
  getLocation = location => {
    let { service, google } = this.state
    service.findPlaceFromQuery(
      {
        query: location,
        fields: ['geometry']
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          let res = results[0]
          let center = {
            lat: res.geometry.location.lat(),
            lng: res.geometry.location.lng()
          }
          service.nearbySearch(
            {
              location: center,
              radius: 5000,
              name: 'Chase Bank'
            },
            (markers, stat) => {
              if (stat === google.maps.places.PlacesServiceStatus.OK) {
                markers = markers.map(m => ({
                  lat: m.geometry.location.lat(),
                  lng: m.geometry.location.lng()
                }))
                console.log(markers)
                this.setState({
                  markers,
                  center
                })
              }
            }
          )
        }
      }
    )
  }
  render () {
    return (
      <div>
        <nav class='bg-black flex justify-between bb b--white-10'>
          <a
            class='link white-70 hover-white no-underline flex items-center pa3'
            href=''
          >
            <svg
              class='dib h1 w1'
              data-icon='grid'
              viewBox='0 0 32 32'
              style={{ fill: 'currentcolor' }}
            >
              <title>Spartan Banking</title>
              <path d='M2 2 L10 2 L10 10 L2 10z M12 2 L20 2 L20 10 L12 10z M22 2 L30 2 L30 10 L22 10z M2 12 L10 12 L10 20 L2 20z M12 12 L20 12 L20 20 L12 20z M22 12 L30 12 L30 20 L22 20z M2 22 L10 22 L10 30 L2 30z M12 22 L20 22 L20 30 L12 30z M22 22 L30 22 L30 30 L22 30z' />
            </svg>
          </a>
          <div class='flex-grow pa3 flex items-center'>
            <a class='f6 link dib white dim mr3 mr4-ns'>
              <Link to='/'>Dashboard</Link>
            </a>
            <a class='f6 link dib white dim mr3 mr4-ns'>
              <Link to='/contact'>Support</Link>
            </a>
          </div>
        </nav>
        <form
          onSubmit={e => {
            e.preventDefault()
            let location = document.getElementById('text').value
            this.getLocation(location)
          }}
          class='pa4 black-80'
          style={{ fontFamily: 'sans-serif' }}
        >
          <div class='measure-narrow'>
            <label for='password' class='f6 b db mb2'>
              Location
            </label>
            <input
              class='input-reset ba b--black-20 pa2 mb2 db w-100'
              type='text'
              id='text'
              aria-describedby='text-desc'
            />
            <small id='password-desc' class='f6 lh-copy black-60 db mb2'>
              Enter the location to find atms around
            </small>
          </div>
        </form>
        <div>
          <MapContainer
            center={this.state && this.state.center}
            markers={this.state && (this.state.markers || [])}
            fetchPlaces={this.fetchPlaces}
          />
        </div>
      </div>
    )
  }
}

export default Maps
