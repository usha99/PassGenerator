import { TextInput,TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik';

// Form validation 

import * as Yup  from 'yup';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength : Yup.number()
  .min(4, 'Should be min of 4 characters' )
  .max(8, 'Should be Length of 8 characters')
  .required('Length is required')
})

export default function App() {
   const [password, setPassword] = useState('')
   const [isPassGenerated, setIsPassGenerated] = useState(false)
   const [lowerCase, setLowerCase] = useState(true)
   const [upperCase, setUpperCase] = useState(false)
   const [numbers, setNumbers] = useState(false)
   const [symbols, setSymbols] = useState(false)

   const generatePasswordString = (passwordLength:number)=>{
         let characterList = ''
         const upperCaseCharacter = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
         const lowerCaseCharacter = 'abcdefghijklmnopqrstuvwxyz'
         const digitCharacter = '0123456789'
         const specialCharacter = '!@#$%^&*()_+?|\/`~<>,.[]{};:'

         if(upperCase){
          characterList += upperCaseCharacter
         }
         if(lowerCase){
          characterList += lowerCaseCharacter
         }
         if(numbers){
          characterList += digitCharacter
         }
         if(symbols){
          characterList += specialCharacter
         }

         const passResult = createPassword(characterList, passwordLength)

   }
   const createPassword = (characters : string, passwordLength: number) => {
      let result = ''
      for(let i=0;i<passwordLength; i++){
        const characterIndex = Math.round(Math.random() * characters.length) 
         result += characters.charAt(characterIndex)
      }
      return result
      console.log("success");
      

   }

   const resetPasswordState = (password:string) => {
         setPassword('')
         setIsPassGenerated(false)
         setLowerCase(true)
         setUpperCase(false)
         setSymbols(false)
         setNumbers(false)

   }

  return (
    <View>
      <ScrollView keyboardShouldPersistTaps="handled">
        <SafeAreaView style={styles.appContainer}></SafeAreaView>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
       initialValues={{ passwordLength : '' }}
       validationSchema={PasswordSchema}
       onSubmit={ (values)=>{
          generatePasswordString(Number(values.passwordLength))  //
          console.log(values);
          
       } }
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset
         /* and other goodies */
       }) => (
         <>
          <View style={styles.inputWrapper}>
            <View style={styles.inputColumn}>
              <Text style={styles.heading}>Password length</Text>
              {touched.passwordLength && errors.passwordLength && (
                <Text style={styles.errorText}>
                  {errors.passwordLength}
                </Text>
              )}
             
            </View>
            <TextInput 
               style={styles.inputStyle}
               value={values.passwordLength}
               onChangeText={handleChange('passwordLength')}
               placeholder='Enter Your Password'
               keyboardType='numeric'

              ></TextInput>
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Lowercase</Text>
            <BouncyCheckbox 
             disableBuiltInState
             isChecked={lowerCase}
             onPress={()=> setLowerCase(!lowerCase)}
             fillColor='#29AB87'
            ></BouncyCheckbox>
          </View>
          <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Uppercase</Text>
            <BouncyCheckbox 
             disableBuiltInState
             isChecked={upperCase}
             onPress={()=> setUpperCase(!upperCase)}
             fillColor='#29AB87'
            ></BouncyCheckbox>
          </View>
          <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Numbers</Text>
            <BouncyCheckbox 
             disableBuiltInState
             isChecked={numbers}
             onPress={()=> setNumbers(!numbers)}
             fillColor='#29AB87'
            ></BouncyCheckbox>
          </View>
          <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Symbols</Text>
            <BouncyCheckbox 
             disableBuiltInState
             isChecked={symbols}
             onPress={()=> setSymbols(!symbols)}
             fillColor='#29AB87'
            ></BouncyCheckbox>
          </View>

          <View style={styles.formActions}>
          <TouchableOpacity><Text>Generate Password</Text></TouchableOpacity>
          <TouchableOpacity><Text>Reset</Text></TouchableOpacity>

          </View>
         </>
       )}
     </Formik>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});