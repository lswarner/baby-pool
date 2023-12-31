import { useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { useLocalStorage } from '~/hooks/useLocalStorage';

import { fetchOrCreateParticipant } from "~/firebase";

const gid= '7HaxvKxuQ6MHqSYwp3Uz';

const JoinGroup = () => {
    const [groupId, setGroupId] = useLocalStorage<string>('groupId', '')
    const [name, setName] = useLocalStorage<string>('name', '');
    const [email, setEmail] = useLocalStorage<string>("email", '');
    const [responses, setResponses]= useLocalStorage<string[]>("responses", []);



    const navigate = useNavigate();

    // set the default groupId
    useEffect(() => {
        setGroupId(gid);
    }, [])


    const gotoScorecard = () => {
        navigate('/scorecard');
    }

    // button handlers
    const handleSubmit = async () => {
        console.log(`<<< Fetching Or Create Participant ${name}, ${email}`)
        const p= await fetchOrCreateParticipant(groupId, name, email);
        if(p){
            // participant already joined the group- so load their saved responses
            if(responses.length){
                console.log(`...loading saved responses over local storage`)
            }
            setResponses(p.guesses);
        }

        navigate('/questions');
    }

    const handleSignout = () => {
        localStorage.clear();
        setName('');
        setEmail('');
        setGroupId(gid); // DON'T clear the groupid
    }

    return (
        <div className="flex flex-col">
            <div className="container mx-auto px-2 mt-6 md:px-20 md:mt-10">
                <div className="text-4xl md:text-6xl font-bold text-primary-focus font-display">Christina + Luke&apos;s Baby Pool</div>
            </div>
            
         
            <div className="container mx-auto px-2 mt-6 md:px-20 md:mt-10">
                
                
                <div className="flex flex-col md:flex-row justify-center md:justify-start">
                    <div className="w-full text-center md:w-1/3 lg:w-2/5">
                    <div className="avatar">
                        <div className="w-80 md:w-48 lg:w-80 mask mask-squircle">
                            <img src="/two-bumps.jpg" />
                        </div>
                    </div>
                    </div>
                    <div className="py-2 px-2 mt-2 w-full md:w-2/3 lg:w-3/5">
                        <p className="text-2xl font-bold mb-3">Christina and Luke are having a girl!</p>
                        <p className="mt-0">Celebrate with them by playing this baby-birthday guessing game.</p>
                        <p className="mb-4">Just enter your <b>name</b> and <b>email</b> to get started.</p>
                        <p className="my-4">
                            After the baby is born, we&apos;ll calculate the results, 
                            then contact you so you can see who guessed best. If another family member wants to guess using the same 
                            browser, you can click the `sign out` button below to clear the saved guesses.
                            <em>(And if one of the kids wants to play, but they don&apos;t have an email, you can make something up or put in an empty space.)</em>
                        </p>
                        <p className="my-4">Or you can skip straight to the&nbsp;
                            <a className= "text-secondary-focus hover:underline cursor-pointer" onClick={gotoScorecard}>Scorecard</a> 
                            &nbsp;to see everyone else&apos;s guesses. Don&apos;t be a copy-cat!</p>
                    </div>
                    
                </div>
                
            </div>
     

            <div className="container mx-auto px-2 md:mt-8 md:px-20 md:mt-16">
                <div className="flex flex-col md:flex-row justify-end">
                    <div className="w-full md:w-2/5 mr-10 mb-6 mt-2 md:mt-4 ">
                        <div className="chat chat-end">
                                <div className="chat-bubble chat-bubble-secondary text-xl font-bold">When will she be born?</div>
                        </div>
                        <div className="chat chat-start">
                            <div className="chat-bubble chat-bubble-neutral text-xl font-bold">How big will the bump get?</div>
                        </div>
                        <div className="chat chat-end">
                            <div className="chat-bubble chat-bubble-primary text-xl font-bold">What will her name will be?</div>
                        </div>
                    </div>
                    <div className="py-4 px-4 w-full md:w-3/5 bg-primary border-2 border-primary-focus rounded-xl">
                        <div className="text-xl font-bold mb-3">Sign up to get started</div>
                        <div className="form-control w-full max-w-xs my-4">
                            <label className="label">
                                <span className="label-text text-lg">What is your name?</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="Your first name or a nickname" 
                                className="input input-bordered input-primary w-full max-w-xs" 
                                value={name}
                                onChange={(e) => setName(e.currentTarget.value)}
                            />
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text text-lg">What is your email?</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="you@email.com" 
                                className="input input-bordered inout-primary w-full max-w-xs" 
                                value={email}
                                onChange={(e) =>{ console.log(e.currentTarget.value); setEmail(e.currentTarget.value)}}
                            />
                        </div>
                        <button 
                            className="btn bg-secondary border-secondary-content text-secondary-content w-full hover:bg-secondary-focus font-display text-2xl mt-4"
                            onClick={handleSubmit}
                        >
                            Let&apos;s Play!
                        </button>
                        <div className="pt-4 text-xs text-primary-content hover:underline cursor-pointer" onClick={handleSignout}>sign out</div>
                    </div>
                            
                </div>      
            </div>
            
          
    
        </div>
    )
}

export default JoinGroup