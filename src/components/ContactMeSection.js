import React, { useEffect } from "react";
import { useFormik } from "formik";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import * as Yup from "yup";
import FullScreenSection from "./FullScreenSection";
import useSubmit from "../hooks/useSubmit";
import { useAlertContext } from "../context/alertContext";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  email: Yup.string().email().required(),
  type: Yup.string().required(),
  comment: Yup.string().required(),
});

const LandingSection = () => {
  const { isLoading, response, submit } = useSubmit();
  const { onOpen } = useAlertContext();
  const { errors, resetForm, handleChange, getFieldProps, isSubmitting } =
    useFormik({
      initialValues: {
        firstName: "",
        email: "",
        type: "hireMe",
        comment: "",
      },
      validationSchema: validationSchema,
    });

  useEffect(() => {
    if (response) {
      onOpen(response);
      resetForm();
    }
  }, [isLoading]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    await submit(formProps);
  };

  if (isLoading) {
    return (
      <FullScreenSection
        isDarkBackground
        backgroundColor="#512DA8"
        py={16}
        spacing={8}
      >
        <Spinner />
      </FullScreenSection>
    );
  }

  return (
    <FullScreenSection
      isDarkBackground
      backgroundColor="#512DA8"
      py={16}
      spacing={8}
    >
      <VStack w="1024px" p={32} alignItems="flex-start">
        <Heading as="h1" id="contactme-section">
          Contact me
        </Heading>
        <Box p={6} rounded="md" w="100%">
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.firstName}>
                <FormLabel htmlFor="firstName">Name</FormLabel>
                <Input
                  id="firstName"
                  name="firstName"
                  {...getFieldProps("firstName")}
                />
                <FormErrorMessage>{errors.firstName}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={false}>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  {...getFieldProps("email")}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.type}>
                <FormLabel htmlFor="type">Type of enquiry</FormLabel>
                <Select id="type" name="type" {...getFieldProps("type")}>
                  <option key="hireMe" value="hireMe">
                    Freelance project proposal
                  </option>
                  <option key="openSource" value="openSource">
                    Open source consultancy session
                  </option>
                  <option key="other" value="other">
                    Other
                  </option>
                </Select>
                <FormErrorMessage>{errors.type}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={errors.comment}>
                <FormLabel htmlFor="comment">Your message</FormLabel>
                <Textarea
                  id="comment"
                  name="comment"
                  height={250}
                  {...getFieldProps("comment")}
                />
                <FormErrorMessage>{errors.comment}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="purple"
                width="full"
                disabled={isSubmitting || Object.keys(errors).length}
              >
                Submit
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </FullScreenSection>
  );
};

export default LandingSection;
