import React, { Component } from 'react';

class QuizFormResult extends Component {
    constructor(props){
        super(props);
        this.state = {
            copied: false,
        };
    }

    render() {
        const { result } = this.props;
        const style = {
            resultBox: {
                background: '#e1f5fe',
                minHeight: 260,
                padding: 20,
                margin: 20
            },
            button: {
                whiteSpace: 'nowrap',
                display: 'inline-block',
                borderRadius: '5px',
                padding: '10px 15px',
                margin: '0 0 20px 20px',
                fontSize: '20px',
                color: '#fff',
                backgroundImage: 'linear-gradient(#4f93ce,#285f8f)',
                border: '1px solid #285f8f',
                cursor: 'pointer'
            }
        }

        return (
            <div className="QuizFormResult">
                { result != null ? (
                    <div>
                        <div style={style.resultBox}>
                            { result.quizTitle }
                        </div>
                    </div>
                ) : null
                }
            </div>
        );
    }
}

export default QuizFormResult;