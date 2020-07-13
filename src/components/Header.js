import React, { Component } from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native';

import Button from './Button';

import { flag, timer, reload, arrowDown } from '../assets/images';
import * as Style from '../assets/styles';

import { Constants } from '../utils';

export default class Container extends Component{
    state = {
        countdown: '00:00',
        seconds: 0
    };
    
    componentDidMount(){
        setInterval(this.time.set, 1000);
    };

    componentDidUpdate(prevProps){
        if(prevProps.clear !== this.props.clear){
            this.time.reset();
        }
    };

    time = {
        pad: (time) => {
            var timeString = time + "";
            if (timeString.length < 2) {
                return "0" + timeString;
            } else {
                return timeString;
            }
        },
        reset: () => {
            this.setState({
                countdown: '00:00',
                seconds: 0
            });
        },
        set: () => {
            let { seconds } = {...this.state};
            ++seconds;
            let countdown = this.time.pad(parseInt(seconds / 60));
            countdown += ':' + this.time.pad(seconds % 60);
            this.setState({
                countdown,
                seconds
            });
        }
    };
    
    refresh = () => {
        const { onChange } = this.props;
        onChange('Hard', true);
        this.time.reset();
    };

    render(){
        const height = Constants.HEADER_HEIGHT;
        const { difficulty, open, mines } = this.props;
        const { countdown } = this.state;
        return (
            <>
                <View style={[Style.header.container, { height }]}>
                    <Button label={difficulty} onPress={open} image={arrowDown}/>
                    <View style={Style.header.flag}>
                        <Image source={flag} style={Style.header.image} />
                        <Text style={Style.header.text}>{mines}</Text>
                    </View>
                    <View style={Style.header.timer}>
                        <Image source={timer} style={Style.header.image} />
                        <Text style={Style.header.text}>{countdown}</Text>
                    </View>
                    <TouchableOpacity onPress={this.refresh}  style={Style.header.reload}>
                        <Image source={reload} style={Style.header.image} />
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}