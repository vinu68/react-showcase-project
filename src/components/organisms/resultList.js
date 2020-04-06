import React from 'react';
import Cards from '../molecules/cards'

const ResultList = props=>{

        console.log("resultdata",props.resultItem);
    return (
        <div className='row'>
        {props.resultItem.map((data,index)=>{
            return (
                <div className='col-sm-6 col-md-4 col-lg-3 mt-4' key={index}>
                        <Cards data={data} />        
                </div>
            )
        })}          
                
        </div>
    );
}

export default ResultList;