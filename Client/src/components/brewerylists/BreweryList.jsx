import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBreweriesByCity, fetchBreweriesByName, fetchBreweriesByType } from '../../Redux/breweriesSlice';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const BreweryList = ({ searchType, query }) => {
  const dispatch = useDispatch();
  const { breweries, loading, error } = useSelector((state) => state.breweries);

  useEffect(() => {
    if (searchType === 'city') {
      dispatch(fetchBreweriesByCity(query));
    } else if (searchType === 'name') {
      dispatch(fetchBreweriesByName(query));
    } else if (searchType === 'type') {
      dispatch(fetchBreweriesByType(query));
    }
  }, [searchType, query, dispatch]);

  if (loading) return <p style={{ margin: "90px", textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ margin: "90px", textAlign: "center" }}>{error}</p>;
  if (!breweries.length) return <p style={{ margin: "90px", textAlign: "center" }}>No breweries found.</p>;

  return (
    <Box sx={{ width: "100%", display: 'flex', flexWrap: 'wrap', alignItems: "center", justifyContent: "center", gap: 3, marginTop: "20px", paddingLeft: "20px" }}>
      {breweries.map((brewery) => (
        <Card key={brewery.id} variant="outlined" sx={{ width: "10rem", height: "22rem", minWidth: 275, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {brewery.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {brewery.street}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: "3px" }}>
              Ph.No: {brewery.phone}
            </Typography>
            <Typography variant="body2">
              <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">{brewery.website_url}</a>
            </Typography>
            <Typography sx={{ mb: 0, mt: 2 }} color="text.secondary">
              {brewery.city}, {brewery.state}
            </Typography>
            <Typography sx={{ mb: 0, mt: 2 }} color="text.secondary">
              Average Rating: {brewery.averageRating ? brewery.averageRating.toFixed(1) : 'No rating available'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" component={Link} to={`/brewery/${brewery.id}`} >
              Learn More
            </Button>
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default BreweryList;
