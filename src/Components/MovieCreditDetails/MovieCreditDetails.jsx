import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IMG_URL } from '../../utils/constants';

const MovieCreditDetails = () => {
    const { crew } = useSelector((state)=>state.movieReducer);

    const [teamDetails, setTeamDetails] = useState([]);
        
    useEffect(() => {
        setTeamDetails([]);

        const newTeamDetails = [
            ...teamDetails,
            crew?.crew?.find((person) => person.known_for_department === 'Sound'),
            crew?.crew?.find((person) => person.known_for_department === 'Directing'),
            crew?.crew?.find((person) => person.known_for_department === 'Camera'),
            crew?.crew?.find((person) => person.known_for_department === 'Editing'),
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
                                <div className="text-white font-mono font-semibold">{member.name}</div>
                                <div className="text-white text-sm">Character: {member.character}</div>
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
                            <div  className='h-[150px] w-[150px] rounded-full bg-gray-400'></div>
                        }
                        <div className='flex flex-col justify-center w-36 overflow-hidden'>
                            <div className="text-white font-mono font-semibold">{member.name}</div>
                            <div className="text-white text-sm">{member.job}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>



  )
}

export default MovieCreditDetails
