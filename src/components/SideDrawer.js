import React from "react";
import "./SideDrawer.css";
import classNames from "classnames";
import { FollowUsSocialIcons, ShareWithSocialIcons } from "./SocialIcons";
import { ReactComponent as ClockIcon } from "assets/icons/timerIcon.svg";
import { ReactComponent as InfoIcon } from "assets/icons/informationIcon.svg";
import RateUs from "./RateUs";
import {
  formatTo12Hour,
  getCurrentTimeZoneAbbrevation,
} from "../utils/dateUtils";

const SideDrawer = React.memo(
  ({ version, isOpen, handleDrawer, onClickRateUsDrawer }) => {
    return (
      <div>
        <span
          className={classNames("openButton", { hide: isOpen })}
          onClick={handleDrawer}
        >
          {/* &#9776; */}
          <InfoIcon className="infoIcon" />
        </span>
        <div className={classNames("sidenav", { open: isOpen })}>
          <div
            key={isOpen}
            className={classNames("contentContainer", { hide: !isOpen })}
          >
            <button className="closebtn" onClick={handleDrawer}>
              &times;
            </button>
            <div className="infoContainer sixteenPx">
              <ClockIcon className="icon" />
              <p>
                Quotes are updated everyday at{" "}
                {formatTo12Hour(new Date("2021-01-01T03:00:00.000Z"))}{" "}
                {getCurrentTimeZoneAbbrevation()}
              </p>
            </div>
            <div className="infoContainer twentyPx">
              <h1>Tell your friends</h1>
              <ShareWithSocialIcons />
            </div>
            <div className="infoContainer twentyPx">
              <h1>Follow us on</h1>
              <FollowUsSocialIcons />
            </div>
            <div className="infoContainer ">
              <RateUs onClick={onClickRateUsDrawer} visible={true} />
              <div className="copyrightContent twelvePx">
                Copyright &copy; 2021, Isha Foundation
              </div>
            </div>
            <span className="version">v{version}</span>
          </div>
        </div>
      </div>
    );
  }
);

export default SideDrawer;
