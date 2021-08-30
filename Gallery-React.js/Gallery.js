class Post extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            index: props.startImagePosition || 0,
        }
    }

    render () {
        const { title } = this.props
        const { gallery } = this.props
        const { description } = this.props
        const length = gallery.length - 1
        const imgIndex = this.state.index
        const PostContent = HTMLContent || Content

        const handleNext = () => {
            const newIndex = imgIndex + 1
            this.setState({
                index: imgIndex === length ? 0 : newIndex
            })
        }

        const handlePrevious = () => {
            const newIndex = imgIndex - 1
            this.setState({
                index: imgIndex === 0 ? length : newIndex
            })
        }

        return (
            <>
                {/* header (title & description) -------------------------------------------- */}
                <div id={title.split(' ').join('_')} className="mar-top"></div>
                <div className="mar-left"></div>
                <div className="mar-right"></div>

                <header>
                    <h1>
                        <a href={"#" + title.split(' ').join('_')}>
                            {title}
                        </a>
                    </h1>

                    <PostContent
                        className="description"
                        content={description}
                    />

                    <span>
                        Image {imgIndex + 1}/{length + 1}
                    </span>
                    <div className="border"></div>
                </header>

                {/* gallery (image slide) --------------------------------------------------- */}
                <div className="gallery">

                    <div className="prev-next">
                        <Cursor text="Previous" onClick={handlePrevious} />
                        <Cursor text="Next" onClick={handleNext} />
                    </div>

                    {gallery && gallery.map((item, index) => (
                        <div className="work-image-box"
                            style={{
                                display: index !== imgIndex ? "none" : "block"
                            }}
                        >
                            <PreviewCompatibleImage
                                imageInfo={{
                                    image: item.image,
                                    alt: `image of ${title}`,
                                }}
                                className="work-image-size"
                            />

                        </div>
                    ))}
                </div>
                <div className="mar-bot"></div>

            </>
        )
    }
}