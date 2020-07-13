import React, { Component } from 'react';
import { 
    View,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import Tiles from './Tiles';

import Modal from '../../components/Modal';
import Button from '../../components/Button';

import { shovel, flag, cancel } from '../../assets/images';
import * as Style from '../../assets/styles';

import { Constants } from '../../utils';

export default class Board extends Component{
    state = {
        top: -1000,
        left: -1000,
        dig: null,
        flag: null,
        won: false,
        lost: false
    };

    win = () => {
        this.setState({
            win: true
        });
    };

    lose = () => {
        this.setState({
            lost: true
        });
    };

    popover = ({width, height, px, py,  dig, flag}) => {
        this.setState({
            // width,
            // height,
            top: py,
            left: px,
            dig,
            flag
        });
    };

    close = () => {
        this.setState({
            top: -1000,
            left: -1000
        });
    };

    act = action => {
        const { dig, flag } = this.state;
        if(action === 'shovel'){
            dig();
        }else if(action === 'flag'){
            flag();
        }
        this.close();
    };

    render(){
        var { top, left, won, lost, orientation } = this.state;
        const { rows, columns, mines, clear, reset } = this.props;

        const windowWidth = Dimensions.get('window').width;
        const windowHeight = Dimensions.get('window').height;
        const tileWidth = windowWidth / columns;
        const paddingTop = ((windowHeight - Constants.HEADER_HEIGHT) - (rows * tileWidth)) / 2;
        const position = {
            left: left > 0.5 * windowWidth ? left - 50 : left + tileWidth,
            top: top > 0.5 * windowHeight ? top - 115 + tileWidth : top
        };
        const borderTop = top > 0.5 * windowHeight ? 30 : 0;
        const borderBottom = top > 0.5 * windowHeight ? 0 : 30;
        return (
            <>
                <View style={[Style.board.container, { paddingTop }]}>
                    <Tiles
                        win={this.win}
                        lose={this.lose}
                        popover={this.popover}
                        orientation={orientation}
                        top={top}
                        left={left}
                        rows={rows}
                        columns={columns}
                        mines={mines}
                        size={tileWidth}
                        clear={clear}
                    />
                </View>
                <View style={[Style.board.popoverOptions, {top: position.top, left: position.left, borderTopLeftRadius: borderTop, borderTopRightRadius: borderTop, borderBottomLeftRadius: borderBottom, borderBottomRightRadius: borderBottom}]}>
                    <TouchableOpacity style={Style.board.popoverCancel} activeOpacity={0.6} onPress={this.close}>
                        <Image source={cancel} style={Style.board.popoverCancelImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.board.popoverShovel} activeOpacity={0.6} onPress={() => this.act('shovel')}>
                        <Image source={shovel} style={Style.board.popoverImage} />
                    </TouchableOpacity>
                    <TouchableOpacity style={Style.board.popoverFlag} activeOpacity={0.6} onPress={() => this.act('flag')}>
                        <Image source={flag} style={Style.board.popoverImage} />
                    </TouchableOpacity>
                </View>
                {
                    (won || lost) &&
                    <Modal animate={true} onClose={() => this.setState({won: false, lost: false})}>
                        <View style={Style.board.modalContainer}>
                            <Text style={Style.board.modalContainerText}>{'You ' + (won ? 'Win' : 'Lose')}</Text>
                        </View>
                        <View style={[Style.board.retryContainer]}>
                            <Button label={'Retry'} onPress={() => this.setState({won: false, lost: false}, reset)} />
                        </View>
                    </Modal>
                }
            </>
        );
    };
}