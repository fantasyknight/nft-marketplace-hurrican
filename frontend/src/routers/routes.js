import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// importing all the themes
import ThemeOne from "../themes/theme-one";
import SellAssets from "../components/SellAssets/sell-asset-page";
import MyAssets from "../components/MyAssets/my-assets";
import ExploreTwo from "../themes/explore-two";
import ExploreThree from "../themes/explore-three";
import ItemDetails from "../themes/item-details";
import Activity from "../themes/activity";
import Blog from "../themes/blog";
import BlogSingle from "../themes/blog-single";
import HelpCenter from "../themes/help-center";
import Authors from "../themes/authors";
import Author from "../themes/author";
import WalletConnect from "../themes/wallet-connect";
import CreateNft from "../themes/create-nft";
import CreateCollection from "../themes/create-collection";
import Login from "../themes/login";
import Signup from "../themes/signup";
import AdminCmp from "../themes/admin-page";

class MyRouts extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={ThemeOne} />
            <Route exact path="/explore" component={ExploreThree} />
            {/* <Route exact path="/live-auctions" component={Auctions} /> */}
            <Route exact path="/sell-assets" component={SellAssets} />
            <Route exact path="/my-assets" component={MyAssets} />
            <Route exact path="/create-nft" component={CreateNft} />
            <Route exact path="/create-collection" component={CreateCollection} />
            <Route exact path="/wallet-connect" component={WalletConnect} />
            <Route exact path="/admin" component={AdminCmp} />
            <Route exact path="/explore-2" component={ExploreTwo} />
            <Route exact path="/explore-3" component={ExploreThree} />
            <Route exact path="/item-details" component={ItemDetails} />
            <Route exact path="/activity" component={Activity} />
            <Route exact path="/blog" component={Blog} />
            <Route exact path="/blog-single" component={BlogSingle} />
            <Route exact path="/help-center" component={HelpCenter} />
            <Route exact path="/authors" component={Authors} />
            <Route exact path="/author" component={Author} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </Router>
      </div>
    );
  }
}
export default MyRouts;