import React, { useState, useEffect } from 'react';
import BreweryList from '../brewerylists/BreweryList';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const location = useLocation();
    const [searchType, setSearchType] = useState('');
    const [query, setQuery] = useState('');
    const [showResults, setShowResults] = useState(false);

    // Load initial values from URL parameters
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const initialSearchType = searchParams.get('searchType') || '';
        const initialQuery = searchParams.get('query') || '';
        setSearchType(initialSearchType);
        setQuery(initialQuery);
    }, [location]);

    const handleSearch = (e) => {
        e.preventDefault();
        setShowResults(true);

        // Update URL parameters with current values
        const searchParams = new URLSearchParams();
        searchParams.set('searchType', searchType);
        searchParams.set('query', query);
        // Replace state with URL
        window.history.replaceState({}, '', `${location.pathname}?${searchParams.toString()}`);
    };
    const handleTypeChange = (event) => {
        setSearchType(event.target.value);
    };

    const handleQueryChange = (event) => {
        setQuery(event.target.value);
    };

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "50px"
                }}
                noValidate
                autoComplete="off"
                onSubmit={handleSearch}
            >
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="search-by-label">Search By</InputLabel>
                    <Select
                        labelId="search-by-label"
                        id="search-by"
                        value={searchType}
                        onChange={handleTypeChange}
                        label="Search By"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value="city">City</MenuItem>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="type">Type</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    id="standard-basic"
                    label="Search"
                    variant="standard"
                    value={query}
                    onChange={handleQueryChange}
                />
                <Stack spacing={2} direction="row">
                    <Button type="submit" variant="contained">Search</Button>
                </Stack>
            </Box>
            {showResults && <BreweryList searchType={searchType} query={query} />}
        </>
    );
};

export default Search;
