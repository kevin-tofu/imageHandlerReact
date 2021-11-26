
## How to use image-processing viewer with parameters.  
 You can post some parameters as query to make setting for image-processing module.  
This viewer enables you to make settings with slider.  

```
import ImageHandlerSlider from './components/imagehandler/ImageHandlerSlider'
import { URL_HOST, API_POST, TITLE, DIALOG_TITLE, DIALOG_TEXTCONTENT } from './config'

function App() {

  const nnParams = [{name: 'param1', value: 0.5, min: 0.0, max: 1.0, step: 0.01}, 
                    {name: 'param2', value: 0.4, min: 0.0, max: 1.0, step: 0.01}
                    ]

  return (
    
    <div className="App">
      <ImageHandlerSlider url_host={URL_HOST} api_post={API_POST} 
                          title={TITLE} 
                          dialog_title = {DIALOG_TITLE} dialog_textcontent={DIALOG_TEXTCONTENT}
                          nnParams = {nnParams}
      />
    </div>
  );
}

```