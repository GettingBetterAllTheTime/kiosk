import './Banner.css';

const Banner = () => {
    return (
        <>
            <div className="banner"><img src={process.env.PUBLIC_URL + '/img/banner.jpg'} alt='책상 위 노트북과 커피'/></div>
        </>
    )
}

export default Banner;