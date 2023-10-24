import React from 'react';

const styles = {
  page404: {
    padding: '40px 0',
    background: '#fff',
    fontFamily: 'Arvo, serif',
  },
  fourZeroFourBg: {
    background: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif) no-repeat center',
    height: '400px',
  },
  fourZeroFourHeading: {
    fontSize: '80px',
  },
  link404: {
    color: '#fff',
    padding: '10px 20px',
    background: '#39ac31',
    margin: '20px 0',
    display: 'inline-block',
  },
  contentBox404: {
    marginTop: '-50px',
  },
};

export default function PageNotFound() {
  return (
    <div>
      <section style={styles.page404}>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="col-sm-10 col-sm-offset-1 text-center">
                <div style={styles.fourZeroFourBg}>
                  <h1 style={styles.fourZeroFourHeading}>404</h1>
                </div>

                <div style={styles.contentBox404}>
                  <h3 className="h2">Look like you're lost</h3>
                  <p>Or you aren't cool enough to view this page</p>
                  <a href="/" style={styles.link404}>Go to Home</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
