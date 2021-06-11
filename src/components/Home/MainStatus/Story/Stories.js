import React from 'react';

function Stories(props) {
    return (
        <div className="bg-white ml-3 mr-6 rounded-md shadow">
            <h2 className="py-4 px-6 opacity-80 font-medium border-b text-xl">Đánh giá</h2>
            <div style={{ color: '#bcd809' }} className="flex items-center justify-center py-6">
                <i className="fas fa-star text-2xl px-3"></i>
                <i className="fas fa-star text-2xl px-3"></i>
                <i className="fas fa-star text-2xl px-3"></i>
                <i className="fas fa-star text-2xl px-3"></i>
                <i className="fas fa-star-half-alt text-2xl px-3"></i>
            </div>
        </div>
    );
}

export default Stories;