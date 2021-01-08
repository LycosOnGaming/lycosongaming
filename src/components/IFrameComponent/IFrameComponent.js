import React, { Component } from 'react';
import data from './widgetContent.json';

class IFrameComponent extends Component {
    render() {
        return (
            <>
                {data[this.props.bannertype].map((widgetEntrie, index) => {
                    return (
                        <div
                            className="IFrame"
                            key={widgetEntrie.title + '_' + index}
                        >
                            <iframe
                                title={widgetEntrie.title}
                                src={widgetEntrie.src}
                                marginWidth={widgetEntrie.marginWidth}
                                marginHeight={widgetEntrie.marginHeight}
                                frameBorder={widgetEntrie.frameBorder}
                                scrolling={widgetEntrie.scrolling}
                                width={widgetEntrie.width}
                                height={widgetEntrie.height}
                                allowFullScreen={widgetEntrie.allowFullScreen}
                            />
                        </div>
                    );
                })}
            </>
        );
    }
}

export default IFrameComponent;
