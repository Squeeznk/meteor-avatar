import './App.css';


// Массивы с возможными именами и фамилиями
const names = ['Иван', 'Петр', 'Михаил', 'Константин', 'Александр', 'Андрей', 'Сергей', 'Максим'];
const lastNames = ['Иванов', 'Петров', 'Сидоров', 'Козлов', 'Морозов', 'Васнецов', 'Смирнов', 'Ковалев'];

// Генерация случайной пары имени и фамилии
function generateRandomFullName() {
  return `${names[Math.floor(Math.random() * names.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

const testData = [
  {size: 24, type: "g"},
  {size: 24, type: "g"},
  {size: 24, type: "u"},
  {size: 24, type: "u"},
  {size: 24, type: "p"},
  {size: 24, type: "p"},
  {size: 48, type: "g"},
  {size: 48, type: "g"},
  {size: 48, type: "u"},
  {size: 48, type: "u"},
  {size: 48, type: "p"},
  {size: 48, type: "p"},
  {}
]

function App() {
  return (
    <div className="App">
      {/*ffffff  282c34 */}
      <header className="App-header" style={{backgroundColor: "#282c34"}}>
        { testData.map( (e) => {
          const user = generateRandomFullName()
          return(
            <>
              <div className='App-user'><Avatar size={e.size} type={e.type}>{user}</Avatar> {user}</div>
            </>
          )
        })}
         <div className='App-user'><Avatar>Гермеона</Avatar> Гермеона</div>
        <Avatar></Avatar>
      </header>
    </div>
  );
}

// Пыраметры:
// size: размер аватарки в пикселях ( default: 24 )
// type: тип аватарки (default: "u")
//    "u" = пользователь
//    "g" = группа
//    "p" = плейсхолдер
// TODO: Приучить к цветовым темам, подставля в themetextcolor базовый цвет текста в теме

const Avatar = ({...props}) => {

  const themetextcolor = "#282c34"

  const { size = 24,  children = "", type = "u" } = props;

  const colorPalette = [ '#F94D6E', '#00B140', '#00A9E0', '#685BC7', '#C800A1', '#FFC600', '#FF6900', '#E4002B' ];

  const generateColor = (text) => {
    const textHashCode = text.split('').reduce((hash, char) => (hash << 5) - hash + char.charCodeAt(0), 0);
    const colorIndex = Math.abs(textHashCode) % colorPalette.length;
    return colorPalette[colorIndex];
  };

  const text       = children
  const color      = generateColor(text)
  const textfill   =  (type === "p" ? color : themetextcolor)

  const box        = `0 0 ${size} ${size}`
  const radius     = (type === "g" ? 5 : size/2)
  const fill       = (type === "p" ? "none" : color)
  const stroke     = (type === "p" ? color : "none")
  const dashstroke = (type === "p" ? `${size/6} ${size/12}` : "none")

  function getTwoLetters(inputString) {
    const words = inputString.toUpperCase().trim().split(/\s+/);
    const firstLetter = (words[0] || '').charAt(0).toUpperCase();
    const secondLetter = (words[1] || words[0].charAt(1) || '').charAt(0).toUpperCase();
    return `${firstLetter}${secondLetter}`;
  }

  return( 
    <svg width={size} height={size} viewBox={box} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x={size*0.02} y={size*0.02} width={size*0.96} height={size*0.94} rx={radius} fill={fill} stroke={stroke} stroke-width="3%" stroke-linecap="round" stroke-dasharray={dashstroke}/>
      <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" style={{fill: textfill, fontSize: size/2.3, fontWeight: 800}}>{getTwoLetters(text)}</text>
    </svg>
  )
}

export default App;
