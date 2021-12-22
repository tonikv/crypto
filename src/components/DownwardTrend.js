// UI Element to show downward trend 

const DownwardTrend = ( {downwardTrend} ) => {
    return (
        <div className="info-card">
            <p className="info-header">Longest downward bearing trend</p>
            <p className="info-text">{downwardTrend} days</p>
        </div>
    )
}

export default DownwardTrend
