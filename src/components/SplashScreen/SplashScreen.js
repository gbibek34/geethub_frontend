import React, { useEffect, useState } from "react";
import '../../styles/splashScreen.css';
import { Player, Controls } from "@lottiefiles/react-lottie-player";
// https://assets4.lottiefiles.com/packages/lf20_el4tnl4m.json music lottie file
// https://assets1.lottiefiles.com/packages/lf20_8y3kzptg.json cat
// https://assets2.lottiefiles.com/packages/lf20_0xt1vcey.json dots loader
// https://assets2.lottiefiles.com/packages/lf20_yxoqlsad.json loading text

const SplashScreen = () => {
  return (
    <div className="splash-container">
      <div>
      <Player
          autoplay
          loop
          src="https://assets4.lottiefiles.com/packages/lf20_el4tnl4m.json"
          style={{ height: '300px', width: '300px' }}
        >
          <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
        </Player>
      </div>
      <div className="">
        <Player
          autoplay
          loop
          src="https://assets2.lottiefiles.com/packages/lf20_yxoqlsad.json"
          style={{ height: '200px', width: '500px' }}
        >
          <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
        </Player>
      </div>

    </div>
  );
};
export default SplashScreen;