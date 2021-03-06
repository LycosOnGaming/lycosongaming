import { AppContainer as AppContainerHMR } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import ScrollToTop from 'react-router-scroll-top';
import Admin from './components/Admin/Admin';
import AddNewStreamer from'./components/AddNewStreamer/AddNewStreamer';
import Header from './components/Header/Header';
import FixedNavigation from './components/Navigation/Navigation';
import Landingpage from './components/Landingpage/Landingpage';
import Streamer from './components/Streamer/Streamer';
import SocialMedia from './components/SocialMedia/SocialMedia';
import Reviews from './components/Reviews/Reviews';
import Datenschutz from './components/Datenschutz/Datenschutz';
import Impressum from './components/Impressum/Impressum';
import Disclaimer from './components/Disclaimer/Disclaimer';
import IFrameComponent from './components/IFrameComponent/IFrameComponent';
import Footer from './components/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/main.scss';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Route, BrowserRouter } from 'react-router-dom';

const routerComponentConfig = {};
const middleware = [thunk];

const store = createStore(applyMiddleware(...middleware));

ReactDOM.render(
    <AppContainerHMR>
        <Provider store={store}>
            <BrowserRouter {...routerComponentConfig}>
                <ScrollToTop>
                    <FixedNavigation />
                    <Header />
                    <div className="container-fluid mt-5">
                        <div className="row">
                            <div className="col-2 d-lg-block d-md-none d-sm-none d-none">
                                <div className="container">
                                    <IFrameComponent bannertype="gameWidgetBanner" />
                                </div>
                            </div>
                            <div className="col-12 col-lg-8">
                                <div className="container">
                                    <Route exact path="/" component={Landingpage} />
                                    <Route path="/streamer" component={Streamer} />
                                    <Route
                                        path="/socialmedia"
                                        component={SocialMedia}
                                    />
                                    <Route path="/reviews" component={Reviews} />
                                    <Route path="/admin" component={Admin} />
                                    <Route path="/addNewStreamer" component={AddNewStreamer} />
                                    <Route
                                        path="/datenschutz"
                                        component={Datenschutz}
                                    />
                                    <Route path="/impressum" component={Impressum} />
                                    <Route path="/disclaimer" component={Disclaimer} />
                                </div>
                            </div>
                            <div className="col-2 d-lg-block d-md-none d-sm-none d-none">
                                <div className="container">
                                    <IFrameComponent bannertype="gameChartsBanner" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </Provider>
    </AppContainerHMR>,
    document.getElementById('root'),
    () => {
        delete window.PRELOADED_APPLICATION_STATE;
    }
);
