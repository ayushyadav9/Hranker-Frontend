import React from 'react'

const RightSide = ({ranks}) => {
  return (
    <div className="right-sidebar">
      <div className="widget widget-portfolio">
        <div className="wd-heady">
          <h3>HRanker Rankings</h3>
          {/* <img src="images/photo-icon.png" alt="" /> */}
        </div>
        <div class="acc-setting">
          <div class="profile-bx-details">
            <div class="stats-list">
            <div class="stats-item">
                <div class="profile-bx-info">
                  <div class="pro-bx">
                    <img src="/images/eng.png" alt="" />
                    <div class="bx-info">
                      <h3>{ranks?.active}</h3>
                      <h5>Engagement Rank</h5>
                    </div>
                  </div>
                  <p>Calculated based on your activity on platform</p>
                </div>
              </div>
              <div class="stats-item">
                <div class="profile-bx-info">
                  <div class="pro-bx">
                    <img src="/images/goal.png" alt="" />
                    <div class="bx-info">
                      <h3>{ranks?.top}</h3>
                      <h5>Top Rank</h5>
                    </div>
                  </div>
                  <p>Calculated based on your all time highest points</p>
                </div>
              </div>
              <div class="stats-item">
                <div class="profile-bx-info">
                  <div class="pro-bx">
                    <img src="/images/blogg.png" alt="" />
                    <div class="bx-info">
                      <h3>{ranks?.blogs}</h3>
                      <h5>Total Blogs Posted</h5>
                    </div>
                  </div>
                  {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p> */}
                </div>
              </div>
              <div class="stats-item">
                <div class="profile-bx-info">
                  <div class="pro-bx">
                    <img src="/images/ques.png" alt="" />
                    <div class="bx-info">
                      <h3>{ranks?.ques}</h3>
                      <h5>Total Questions Posted</h5>
                    </div>
                  </div>
                  {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing.</p> */}
                </div>
              </div>
            </div>
          </div>
          <div class="pro-work-status"></div>
        </div>
      </div>
    </div>
  )
}

export default RightSide