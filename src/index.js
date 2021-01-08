import { AppContainer as AppContainerHMR } from 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import ScrollToTop from 'react-router-scroll-top';
import Header from './components/Header/Header';
import FixedNavigation from './components/Navigation/Navigation';
import Landingpage from './components/Landingpage/Landingpage';
import Partner from './components/Partner/Partner';
import StreamingPlan from './components/StreamingPlan/StreamingPlan';
import SocialMedia from './components/SocialMedia/SocialMedia';
import Reviews from './components/Reviews/Reviews';
import Bingo from './components/Bingo/Bingo';
import Datenschutz from './components/Datenschutz/Datenschutz';
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
                    <div className="col-lg-12 main-page">
                        <div className="col-lg-2 d-lg-block d-md-none d-sm-none d-none">
                            <IFrameComponent bannertype="gameWidgetBanner" />
                        </div>
                        <div className="col-lg-8 content">
                            <Route exact path="/" component={Landingpage} />
                            <Route path="/partner" component={Partner} />
                            <Route
                                path="/streamingplan"
                                component={StreamingPlan}
                            />
                            <Route
                                path="/socialmedia"
                                component={SocialMedia}
                            />
                            <Route path="/reviews" component={Reviews} />
                            <Route path="/bingo" component={Bingo} />
                            <Route
                                path="/datenschutz"
                                component={Datenschutz}
                            />
                            <Route path="/disclaimer" component={Disclaimer} />
                        </div>
                        <div className="col-lg-2 d-lg-block d-md-none d-sm-none d-none">
                            <IFrameComponent bannertype="gameChartsBanner" />
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
