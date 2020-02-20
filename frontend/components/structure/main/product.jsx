import React from 'react';
import GalleryDisplay from './gallery_display';
import ReviewInput from './review_input';
import { Link, withRouter } from 'react-router-dom';

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prevHash: window.location.hash,
      loaded: false
    }
  }

  componentWillUnmount() {
    if (this.props.inModal && !window.location.hash.includes('@')) {
      window.location.hash = this.state.prevHash;
    }
    
    const body = document.getElementsByTagName('body')[0]
    body.classList.remove('no-scroll')
  }

  componentDidMount() {
    const { productId } = this.props;
    this.props.fetchProduct(productId)
    if (this.props.inModal && !this.state.loaded) {
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('no-scroll');
      this.setState({loaded: true});
      // this.props.history.replace(`/products/${productId}`);
    }
  }

  upVote() {
    !!this.props.loggedIn ? (
      null
    ) : (
      this.props.openModal('login')
    )
  }

  cleanUrl(url) {
    if (url[ url.length - 1] === '/') {
      url = url.toLowerCase().substring(0, url.length - 1)
    }
    return url;
  }

  render() {
    if (!this.props.product) {
      return null;
    }
    const { id, title, tagline, website, logoUrl, launch_date, description, status, hunter_id, topics, screenshotUrls, reviews, youtube, hunter, upvote_ids, review_ids } = this.props.product;

    if (!screenshotUrls) {
      return null; 
    }

    return (
      <>
        <section className='product-main'>
          <header>
            <section className='main-info'>
              <img src={logoUrl} alt="" />
              <section className='title-tagline'>
                <a href={website.toLowerCase().startsWith('http') ? website : `http://${website}`} target="_blank">
                  <h3 className='title' >{title}</h3>
                  <i className="fas fa-external-link-alt"></i>
                </a>
                <p className='tagline'>{tagline}</p>

                <ul>
                  <li>TAG 1</li>
                  <li>TAG 2</li>
                </ul>
              </section>
              <section className="link">
                {/* <Link to={`/products/${id}`} >Open product page <i class="fas fa-external-link-alt"></i></Link> */}
              </section>
            </section>
          </header>
          <main>
            <section className="main-image">
              <section className="gallery">
                <GalleryDisplay youtube={youtube} screenshots={screenshotUrls} />
              </section>
              <p className='description'>
                <span>DESCRIPTION</span>
                {description}
              </p>
            </section>

            {/* itterate through all reviews  */}
            <h4>REVIEWS</h4>
            <section className="discussion">
              <section className="review-input">
                <ReviewInput />
              </section>
              <span className='reviews'>
                <ul>
                  {review_ids.map(id => {
                    return (
                      <li key={id}>Review - {id}</li>
                      )
                  })}
                  {review_ids.length === 0 ? (
                    "no reviews yet"
                  ) : (null)}
                </ul>
              </span>
            </section>
          </main>
          <aside className='product'>
            <div className='upvote-section'>
              <span 
                onClick={this.upVote.bind(this)} 
                className="upvote-button">▲ UPVOTE <div>
                  {upvote_ids.length}</div>
              </span>
              <div className='product-upvoters'>
                {upvote_ids.map(id => {

                  return  (<span key={id} className='ppr upvoter-picture'>
                    {id}
                  </span>)
                })}
              </div>
            </div>

            <hr />

            <section className="website-link">
              <h4>Website</h4>
              <a href={website.toLowerCase().startsWith('http') ? website : `http://${website}`} target="_blank">{this.cleanUrl(website)}</a>
            </section>

            <hr />

            <section className="hunter-link">
              <h4>Hunter</h4>
              {/* <ProfilePicture id={hunter_id} /> */}
              <img src={window.pp} className="profile-picture-round"/>
              <Link to={`/@${hunter.username}`}>@{hunter.username}</Link>
            </section>
          </aside>
        </section>
      </>
    )
  }
}
  
export default withRouter(Product);
