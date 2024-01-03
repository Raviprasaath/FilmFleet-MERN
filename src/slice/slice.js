import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { useQuery } from 'react-query'

const initialState = {
    screenMode: "dark",
    isLoading: false,
    error: "",
    nowPlayingMovieList: [],
    popularMovieList: [],
    upcomingMovieList: [],
    topRatedMovieList: [],
    singleMovieFetch: [],
    trailerLink: '',
    userAuth: {},
    watchList: [],
    sideBar: false,
    searchResult: [],
    searchQuery: "",
    relatedMovie: [],
    actionMovie: [],
    adventureMovie: [],
    animationMovie: [],
    comedyMovie: [],
    crimeMovie: [],
    DocumentaryMovie: [],
    DramaMovie: [],
    FamilyMovie: [],
    FantasyMovie: [],
    HistoryMovie: [],
    HorrorMovie: [],
    MusicMovie: [],
    MysteryMovie: [],
    RomanceMovie: [],
    ThrillerMovie: [],
}

const BASE_URL = 'https://api.themoviedb.org/3/movie/'

// const SERVER_BASE_URL = "http://localhost:4502/"
const SERVER_BASE_URL = "https://filmfleet-backend-server.onrender.com/"

const API_KEY = '494170c64724d022e9296a5fa98644eb';
const TMDB_API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OTQxNzBjNjQ3MjRkMDIyZTkyOTZhNWZhOTg2NDRlYiIsInN1YiI6IjY0OTAyNGE5MjYzNDYyMDBhZTFjZGI1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7il3x7f91baELU8ceqe8OYauvsHEJ-lC34vS3Gslqoc'

const createMovieAsyncThunk = (name, type) => {
    return createAsyncThunk(
      `moviesList/${name}`,
      async ({ page }, { rejectWithValue }) => {
        try {
            const option = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
            };
            const pageNo = page || page.page;
            const url = `${BASE_URL}${type}?language=en-US&page=${pageNo}`

            const response = await axios(url, option);
            return response.data;
        } catch (error) {
            return rejectWithValue({ error: 'An error occurred during the fetch' });
        }
      }
    );
};

export const getNowPlaying = createMovieAsyncThunk('getNowPlaying', 'now_playing');
export const getPopular = createMovieAsyncThunk('getPopular', 'popular');
export const getUpcoming = createMovieAsyncThunk('getUpcoming', 'upcoming');
export const getTopRated = createMovieAsyncThunk('getTopRated', 'top_rated');

export const gettingSearchList = createAsyncThunk(
    'movieList/gettingSearchList',
    async({queryValue, page}, {rejectWithValue}) => {
        try {
            const option = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_API_TOKEN}`
                }
            }
            const url = `https://api.themoviedb.org/3/search/movie?query=${queryValue}&include_adult=true&language=en-US&page=${page}`
            const response = await axios(url, option);
            return response.data;            
        }
        catch(error) {
            return rejectWithValue({error: 'Movie Fetching Fails'})
        }
    }
)

export const getSingleMovie = createAsyncThunk(
    'moviesList/getSingleMovie',
    async ({id}, {rejectWithValue}) => {
        try {
            const option = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_API_TOKEN}`
                }
            }
            const url = `${BASE_URL}${id}?language=en-US`
            const response = await axios(url, option);
            localStorage.setItem('singleMovieResult',JSON.stringify(response.data));
            return response.data;
        } catch (error) {
            return rejectWithValue({error: 'Movie Fetching Fails'})            
        }
    }
)

export const getTrailerOut = createAsyncThunk(
    'moviesList/getTrailerOut',
    async ({id}, {rejectWithValue}) => {
        try {
            const option = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_API_TOKEN}`
                }
            }
            const url = `${BASE_URL}${id}/videos?language=en-US`
            const response = await axios(url, option);
            return response.data;
        } catch (error) {
            return rejectWithValue({error: 'Movie Fetching Fails'})
        }
    }
)


// export const getSignup = createAsyncThunk(
//     'userDetail/getSignup',
//     async ({ username, password, email, signing }, { rejectWithValue }) => {
//         let url;
//         let body;
        
//         if (signing === 'login') {
//             url = `${SERVER_BASE_URL}auth/login`;
//             body = {
//                 email,
//                 password,
//             };
//         } else if (signing === 'register') {
//           url = `${SERVER_BASE_URL}auth/register`;
//           body = {
//             username,
//             email,
//             password,
//           };
//         }
        
//         const options = {
//             method: 'POST',
//             body: JSON.stringify(body),
//             headers: {
//                 'Content-Type': 'application/json',
//                 accept: 'application/json',
//             },
//         };
        
//     try {
//         const response = await axios(url, options);
//         return response.data;
//       } catch (error) {
//         return rejectWithValue({ error: "Signing Fails" });
//       }
//     }
// );
export const getSignup = createAsyncThunk(
    'userDetail/getSignup',
    async ({username, password, email, signing}, {rejectWithValue}) => {

        let url;
        let body;

        if (signing === 'login') {
            url = SERVER_BASE_URL + 'auth/login';
            body = {
                email,
                password,
            };
        } else if (signing === 'register') {
            url = SERVER_BASE_URL + 'auth/register';
            body = {
                username,
                email,
                password,
            };
        }

        const options = {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                accept: 'application/json',
            },
        };

        try{
            const response = await fetch(url, options);
            console.log(response);
            if (response.ok) {
                const result = await response.json();
                return result;
            } else {
                const errorResponse = await response.json();

                if (errorResponse) {
                    return rejectWithValue({ error: errorResponse });
                } else {
                    return rejectWithValue({ error: 'Request failed. Please try again.' });
                }
            }
        } catch (e) {
            return rejectWithValue({error: e})
        }
    }
)

export const gettingWatchList =createAsyncThunk(
    'watchListGetting/gettingWatchList',
    async ({tokenValue, methods, suffix, movie }, {rejectWithValue}) => {

        let myHeaders = new Headers();
        myHeaders.append("projectID", "vflsmb93q9oc");
        myHeaders.append("Authorization", `Bearer ${tokenValue}`);
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('accept', 'application/json');

        let requestOptions;
        if (methods === "POST" || methods === "DELETE") {
            let raw = JSON.stringify({
                detail: movie,
              })
              requestOptions = {
                  method: methods,
                  headers: myHeaders,
                  body: raw,
                  redirect: 'follow'
                };
            } else if (methods === "GET") {
            requestOptions = {
                method: methods,
                headers: myHeaders,
                redirect: 'follow'
            };
        }
        let url = SERVER_BASE_URL + suffix
        

        try {
            const response = await fetch(url, requestOptions);
            if (response.ok) {
                const result = await response.json();
                return result
            } else {
                return rejectWithValue({error: 'Watch list fetching error'})
            }
        } catch (e) {
            console.log(e);
        }
    }
)

export const gettingRelatedMovie =createAsyncThunk(
    'movieList/gettingRelatedMovie',
    async ({ value, page }, { rejectWithValue }) => {
        try {
            const option = {
              method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${TMDB_API_TOKEN}`,
              },
            };
            const pageNo = page || page.page;
            const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${pageNo}&with_genres=${value}`

            const response = await axios(url, option);
            return response.data;
        } catch(error) {
            return rejectWithValue({ error: 'An error occurred during the fetch' });
        }
    }
)

const genresMovieAsyncThunk = (name, type) => {
    return createAsyncThunk(
      `moviesTypeList/${name}`,
      async ({ page }, { rejectWithValue }) => {
        try {
            const option = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: `Bearer ${TMDB_API_TOKEN}`,
                },
            };
            const pageNo = page || page.page;
            const url = `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=${pageNo}&with_genres=${type}`
            const response = await axios(url, option);
            return response.data;      
        } catch (error) {
            return rejectWithValue({ error: 'An error occurred during the fetch' });
        }
    }
    );
};

export const getActionMovie = genresMovieAsyncThunk('getActionMovie', '28');
export const getAdventureMovie = genresMovieAsyncThunk('getAdventureMovie', '12');
export const getAnimationMovie = genresMovieAsyncThunk('getAnimationMovie', '16');
export const getComedyMovie = genresMovieAsyncThunk('getComedyMovie', '35');
export const getCrimeMovie = genresMovieAsyncThunk('getCrimeMovie', '80');
export const getDocumentaryMovie = genresMovieAsyncThunk('getDocumentaryMovie', '99');
export const getDramaMovie = genresMovieAsyncThunk('getDramaMovie', '18');
export const getFamilyMovie = genresMovieAsyncThunk('getFamilyMovie', '10751');
export const getFantasyMovie = genresMovieAsyncThunk('getFantasyMovie', '14');
export const getHistoryMovie = genresMovieAsyncThunk('getHistoryMovie', '36');
export const getHorrorMovie = genresMovieAsyncThunk('getHorrorMovie', '27');
export const getMusicMovie = genresMovieAsyncThunk('getMusicMovie', '10402');
export const getMysteryMovie = genresMovieAsyncThunk('getMysteryMovie', '9648');
export const getRomanceMovie = genresMovieAsyncThunk('getRomanceMovie', '10749');
export const getThrillerMovie = genresMovieAsyncThunk('getThrillerMovie', '53');



const movieSlices = createSlice({
    name: "movieSlice",
    initialState,
    reducers: {
        screenModeToggler: (state, action) => {
            action.payload === "light" ? state.screenMode = "dark": state.screenMode = "light";
        },
        sideBarStore: (state, action) => {
            state.sideBar = action.payload;
        },
        searchQueryStore: (state, action) => {
            state.searchQuery = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getNowPlaying.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getNowPlaying.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.nowPlayingMovieList = action.payload,
            state.error = ''
        })
        .addCase(getNowPlaying.rejected, (state, action)=> {
            state.isLoading = false,
            state.error = action.payload.error
        })

        .addCase(getPopular.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getPopular.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.popularMovieList = action.payload,
            state.error = ''
        })
        .addCase(getPopular.rejected, (state, action)=> {
            state.isLoading = false,
            state.error = action.payload.error
        })

        .addCase(getTopRated.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getTopRated.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.topRatedMovieList = action.payload,
            state.error = ''
        })
        .addCase(getTopRated.rejected, (state, action)=> {
            state.isLoading = false,
            state.error = action.payload.error
        })

        .addCase(getUpcoming.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getUpcoming.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.upcomingMovieList = action.payload,
            state.error = ''
        })
        .addCase(getUpcoming.rejected, (state, action)=> {
            state.isLoading = false,
            state.error = action.payload.error
        })

        .addCase(getSingleMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getSingleMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.singleMovieFetch = action.payload,
            state.error = ''
        })
        .addCase(getSingleMovie.rejected, (state, action)=> {
            state.isLoading = false,
            state.error = action.payload.error
        })
        
        .addCase(getTrailerOut.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getTrailerOut.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.trailerLink = action.payload,
            state.error = ''
        })
        .addCase(getTrailerOut.rejected, (state, action)=> {
            state.isLoading = false,
            state.error = action.payload.error
        })

        
        .addCase(getSignup.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getSignup.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.userAuth = action.payload,
            state.error = ''
        })
        .addCase(getSignup.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(gettingWatchList.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(gettingWatchList.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.watchList = action.payload,
            state.error = ''
        })
        .addCase(gettingWatchList.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(gettingSearchList.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(gettingSearchList.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.searchResult = action.payload,
            state.error = ''
        })
        .addCase(gettingSearchList.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(gettingRelatedMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(gettingRelatedMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.relatedMovie = action.payload,
            state.error = ''
        })
        .addCase(gettingRelatedMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getActionMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getActionMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.actionMovie = action.payload,
            state.error = ''
        })
        .addCase(getActionMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getAdventureMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getAdventureMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.adventureMovie = action.payload,
            state.error = ''
        })
        .addCase(getAdventureMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getAnimationMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getAnimationMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.animationMovie = action.payload,
            state.error = ''
        })
        .addCase(getAnimationMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getComedyMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getComedyMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.comedyMovie = action.payload,
            state.error = ''
        })
        .addCase(getComedyMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getCrimeMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getCrimeMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.crimeMovie = action.payload,
            state.error = ''
        })
        .addCase(getCrimeMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getDocumentaryMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getDocumentaryMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.DocumentaryMovie = action.payload,
            state.error = ''
        })
        .addCase(getDocumentaryMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getDramaMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getDramaMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.DramaMovie = action.payload,
            state.error = ''
        })
        .addCase(getDramaMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getFamilyMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getFamilyMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.FamilyMovie = action.payload,
            state.error = ''
        })
        .addCase(getFamilyMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getFantasyMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getFantasyMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.FantasyMovie = action.payload,
            state.error = ''
        })
        .addCase(getFantasyMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getHistoryMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getHistoryMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.HistoryMovie = action.payload,
            state.error = ''
        })
        .addCase(getHistoryMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getHorrorMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getHorrorMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.HorrorMovie = action.payload,
            state.error = ''
        })
        .addCase(getHorrorMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getMusicMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getMusicMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.MusicMovie = action.payload,
            state.error = ''
        })
        .addCase(getMusicMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getMysteryMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getMysteryMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.MysteryMovie = action.payload,
            state.error = ''
        })
        .addCase(getMysteryMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getRomanceMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getRomanceMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.RomanceMovie = action.payload,
            state.error = ''
        })
        .addCase(getRomanceMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
        
        .addCase(getThrillerMovie.pending, (state)=> {
            state.isLoading = true
        })
        .addCase(getThrillerMovie.fulfilled, (state, action)=> {
            state.isLoading = false,
            state.ThrillerMovie = action.payload,
            state.error = ''
        })
        .addCase(getThrillerMovie.rejected, (state, action)=> {
            state.isLoading = false;
            state.error = action.payload ? action.payload.error : 'Unknown error';
        })       
    }
})

export const { screenModeToggler, sideBarStore, searchQueryStore } = movieSlices.actions;
export default movieSlices.reducer;