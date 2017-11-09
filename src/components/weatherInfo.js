import React from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    CardTitle } from 'material-ui/Card';

import PropTypes from 'prop-types';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const WeatherInfo = props => {
    const itemForecast = props.weather ? props.weather.forecast : null;
    const currentCondition = props.weather ? props.weather.currentCondition : null;

    // console.log(props.images.get())

    const styles = {
        root: {
            maxWidth: '500px',
            margin: '0 auto'
        }
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (

        <div>
            {itemForecast
            &&
            <div style={styles.root}>
                <Slider {...settings}>
                    {itemForecast.map((tile) => (
                        <Card key={tile.date}>
                            <CardHeader
                                title={currentCondition.title}
                                subtitle={`${currentCondition.temp}*`}
                            />
                            <CardMedia
                                overlay={
                                    <CardTitle title={tile.date} subtitle={`Temperature ${tile.low} ${tile.high}`} />
                                }
                            >
                                <img src={props.images.get(tile.text)} alt="" />
                            </CardMedia>

                        </Card>
                ))}
                </Slider>
            </div>
            }

        </div>
    );
};

// propTypes

WeatherInfo.propTypes = {
    weather: PropTypes.shape({
        forecast: PropTypes.array.isRequired,
        currentCondition: PropTypes.object.isRequired
    }).isRequired,
    images: PropTypes.object.isRequired
};

export default WeatherInfo;
