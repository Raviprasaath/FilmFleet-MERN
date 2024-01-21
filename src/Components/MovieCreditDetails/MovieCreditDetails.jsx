import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IMG_URL } from '../../utils/constants';
import user from "../../assets/default-user-icon.webp";

const MovieCreditDetails = () => {
    const { crew, screenMode } = useSelector((state)=>state.movieReducer);

    const [teamDetails, setTeamDetails] = useState([]);

    useEffect(() => {
        setTeamDetails([]);

        const newTeamDetails = [
            crew?.crew?.find((person) => person.job === 'Original Music Composer' ||person.job === 'Music'),
            crew?.crew?.find((person) => person.job === 'Director'),
            crew?.crew?.find((person) => person.job === 'Director of Photography'),
            crew?.crew?.find((person) => person.job === 'Editor'),
        ].filter((item) => item !== undefined);

        setTeamDetails(newTeamDetails);
    }, [crew]);


    return (
        <>
            <h2 className="my-6 text-xl font-bold">Top Cast</h2>
            <div className="flex w-full p-4 gap-8 overflow-auto scroll-smooth">
                {crew?.cast?.slice(0, 10).map((member) => (
                    <div key={member.credit_id} className='flex items-center flex-col w-36'>
                            
                            {member.profile_path?
                                <img
                                    className="h-24 w-24 object-cover rounded-full"
                                    src={`${IMG_URL}${member.profile_path}`}
                                    alt={`${member.name} Image`}
                                    style={{ objectPosition: '50% 0%', height: '150px', width: '150px' }}
                                />:
                                <div className='h-[150px] w-[150px] rounded-full bg-gray-400'></div>
                            }
                            <div className='flex flex-col justify-center w-36 overflow-hidden'>
                                <div className= {`${screenMode==="dark"?" text-white":" text-black"} font-mono font-semibold`}>{member.name}</div>
                                <div className= {`${screenMode==="dark"?" text-white":" text-black"} text-sm`}>Character: {member.character}</div>
                            </div>
                        </div>
                ))}
            </div>
            <h2 className="my-6 text-xl font-bold">Crew</h2>
            <div className="flex w-full p-4 gap-8 overflow-auto scroll-smooth">
                {teamDetails.map((member) => (
                    <div key={member.credit_id} className='flex items-center flex-col w-36'>
                        {member.profile_path?
                            <img
                                className="h-24 w-24 object-cover rounded-full"
                                src={`${IMG_URL}${member.profile_path}`}
                                alt={`${member.name} Image`}
                                style={{ objectPosition: '50% 0%', height: '150px', width: '150px' }}
                            />:
                            <img className='h-[150px] w-[150px] rounded-full' src={user} alt="" />
                        }
                        <div className='flex flex-col justify-center w-36 overflow-hidden'>
                            <div className= {`${screenMode==="dark"?" text-white":" text-black"} font-mono font-semibold`}>{member.name}</div>
                            <div className= {`${screenMode==="dark"?" text-white":" text-black"} text-sm`}>{member.job}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>



  )
}

export default MovieCreditDetails
