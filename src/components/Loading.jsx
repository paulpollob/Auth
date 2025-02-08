import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => {
    return (
        <div>
            <div style={{ position: 'relative', height: '100vh' }} className='flex flex-col items-center justify-center'>

                <div className="overlay bg-opacity-10">
                    <ReactLoading type="spin" color="#ffffff" height={50} width={50} />
                </div>

                <div >
                    <h1>My Page</h1> 
                </div>
            </div>
        </div>
    );
};

export default Loading;