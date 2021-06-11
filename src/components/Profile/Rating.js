import React from 'react';

function Rating(props) {
    return (
        <div className="p-3 bg-white rounded-lg mt-4 shadow">
            <h1 className="text-2xl font-bold">Đánh giá</h1>
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

export default Rating;