
import CircularProgress from '@mui/material/CircularProgress';


const CircularSpinner = () =>{
    return (
        <div style={{ 
          position: 'relative', 
          height:"100%",
          width:"100%"
        }}>
          <CircularProgress
            color="success"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              
            }}
          />
        </div>
      );

}

export default CircularSpinner