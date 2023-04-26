import { StyleSheet, ActivityIndicator, SafeAreaView, Text, TextArea, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../constants';
import { Configuration, OpenAIApi } from "openai";
import LinearGradient from 'react-native-linear-gradient';

const Home = () => {

  const [prompt, setPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);



  const configuration = new Configuration({
    organization: "org-PpZJFVYT0Vx4Tu9RZ1IFVqhR",
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 4000,
      });
      //console.log("response", result.data.choices[0].text);
      setApiResponse(result.data.choices[0].text);
    } catch (e) {
      //console.log(e);
      setApiResponse("Something is going wrong, Please try again.");
    }
    setLoading(false);
  };



  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.wFull}>
          <View style={styles.row}>
            <TextInput style={styles.input} placeholder="Please ask to openai" onChange={text => setPrompt(text)} />
            <Text>Prompt value: {prompt}</Text>
            
            <View style={styles.loginBtnWrapper}>
              <LinearGradient
                colors={[COLORS.gradientForm, COLORS.primary]}
                style={styles.linearGradient}
                start={{ y: 0.0, x: 0.0 }}
                end={{ y: 1.0, x: 0.0 }}>
                {/******************** LOGIN BUTTON *********************/}
                <TouchableOpacity
                  disabled={loading || prompt === 0}
                  type="submit"
                  activeOpacity={0.7}
                  style={styles.loginBtn}>
                  <Text style={styles.loginText}>Submit</Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
<Text>{loading ? "Generating..." : "Generate"}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <Text>{apiResponse}</Text>
        </View>
      </View>
    </SafeAreaView>
  );


};

export default Home;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  linearGradient: {
    width: '100%',
    borderRadius: 50,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
  },
})
