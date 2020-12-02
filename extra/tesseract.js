import { Text,View } from 'react-native';
import React from 'react';
import { createWorker } from 'tesseract.js';
const tessOptions = {};


export default function App() {
    const worker = createWorker({
        logger: m => console.log(m),
      });
      const doOCR = async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
        setOcr(text);
      };
      const [ocr, setOcr] = useState('Recognizing...');
      useEffect(() => {
        doOCR();
      });
    return (
        
        <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <Text>{ocr}</Text>
        </View>
    )
}