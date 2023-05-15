import './Banner.css';

const Banner = () => {
    return (
        <>
            <div className="banner"><img src={process.env.PUBLIC_URL + '/img/banner.jpg'} /></div>
        </>
    )
}

export default Banner;