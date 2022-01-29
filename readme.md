# React.js Elastic Input

## Validate your inputs with flutter style.

![demo](https://i.hizliresim.com/eqhcnd7.gif)

```
      <ElasticInput
        required
        base={divRef}
        value={email}
        validator={(value) => {
          if (value.trim().length <= 0) {
            return 'Please enter your email'
          }
          if (!emailRegex.test(email)) {
            return 'Your email address format is wrong'
          }
          return null
        }}
        onChange={(e) => setEmail(e.target.value)}
        helperText="Mail Address"
        placeholder="Mail address" />

```

| Props                              | Description                                                      | Example                                                                                      |
| ---------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| HtmlInputElement                   | Pass any html input property                                     |                                                                                              |
| inputClass                         | For customize input                                              | `<ElasticInput inputClass="input-style" />`                                                  |
| errorTextClass                     | For customize error text                                         | `<ElasticInput errorTextClass="error-style" />`                                              |
| helperTextClass                    | For customize helper text                                        | `<ElasticInput helperTextClass="helper-style" />`                                            |
| validator: (value: string) => void | Insert your validations here. validator function returns string. |                                                                                              |
| base: Ref                          | Create a ref with useRef() hook and pass to ElasticInput         | `<div ref={roleForm}> /* or any html element */ <ElasticInput base={roleForm} /> ... </div>` |

## Events

```
  useEffect(() => {
    divRef.current.addEventListener('notValid', (e) => {
      // will run when not valid
    })
    divRef.current.addEventListener('valid', (e) => {
        // will run when valid
    })
  }, [])

```

## Full Example

```
function App() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isDisabled, setDisabled] = useState(true)

  const divRef = useRef(null)

  useEffect(() => {
    divRef.current.addEventListener('notValid', (e) => {
      setDisabled(true)
    })
    divRef.current.addEventListener('valid', (e) => {
      setDisabled(false)
    })
  }, [])

  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const sendForm = () => {
    console.log(email);
    console.log(name);
  }

  return (
    <div ref={divRef}>
      <ElasticInput
        inputClass="input-style"
        errorTextClass="error-text"
        helperTextClass="helper-text"
        base={divRef}
        required
        value={name}
        validator={(value) => {
          if (value.trim().length <= 0) {
            return 'Please fill this area'
          }
          if (value.trim().length < 5) {
            return 'Please enter at least 5 character'
          }
          return null
        }}
        onChange={(e) => setName(e.target.value)}
        helperText="Your Name"
        placeholder="Please enter your name" />
      <ElasticInput
        inputClass="input-style"
        errorTextClass="error-text"
        helperTextClass="helper-text"
        required
        base={divRef}
        value={email}
        validator={(value) => {
          if (value.trim().length <= 0) {
            return 'Please enter your email'
          }
          if (!emailRegex.test(email)) {
            return 'Your email address format is wrong'
          }
          return null
        }}
        onChange={(e) => setEmail(e.target.value)}
        helperText="Mail Address"
        placeholder="Mail address" />
      <button disabled={isDisabled} onClick={sendForm}>send</button>
    </div>
  );
}
```
