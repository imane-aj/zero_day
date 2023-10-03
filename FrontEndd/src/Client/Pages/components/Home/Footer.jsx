import React from 'react';
import { Box, Container, HStack, Heading, VStack, Input, Button, Flex, Text, Stack, SimpleGrid, Tag, useColorModeValue, } from '@chakra-ui/react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { EmailIcon, PhoneIcon } from '@chakra-ui/icons'
import { FaLocationArrow } from 'react-icons/fa';
import { useState } from "react";
import { IconButton } from '@chakra-ui/react'
import { createGlobalStyle } from 'styled-components';

const Footer = () => {


    const [email, setEmail] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email submitted:', email);
    };
 
    return (

        <>
            
            <Box
                bg="gray.800" color="white">
                <Container as={Stack} maxW={'6xl'} maxH={'xl'} py={10}>
                    <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
                        <Stack align={'flex-start'}>
                            <Logo />
                            <Text fontSize={'12px'} w={'70%'} >
                                TeLorem ipsum dolor sit amet. Ut quas necessitatibus qui possimus to
                                tam ab tempora recusandae ad
                                ipsum consequuntur
                                tam ab tempora recusandae ad
                                ipsum consequuntur
                            </Text>
                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>Useful Links</ListHeader>
                            <HStack spacing='60px' fontSize={'14px'}>
                                <VStack textAlign="left" alignItems="flex-start">
                                    <a href="#form">Home</a>
                                    <a href="#form">Get a cab</a>
                                    <a href="#news">Our news</a>
                                </VStack>
                                <VStack textAlign="left" alignItems="flex-start" s>
                                    <a href="#aboutus">About Us</a>
                                    <a href="#reviews">Reviews</a>
                                    <a href="#contact">Contacts</a>
                                </VStack>

                            </HStack>

                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>Contact Info</ListHeader>
                            <Box as="a" href={'#'}>
                                <EmailIcon mr="2" />
                                sjckafhah@gmail.com
                            </Box>
                            <Box as="a" href={'#'}>
                                <PhoneIcon mr="2" />
                                666666666
                            </Box>
                            <Box as="a" href={'#'}>

                                1883 Arron Smith Drive
                            </Box>

                        </Stack>
                        <Stack align={'flex-start'}>
                            <ListHeader>  Subscribe to  Us</ListHeader>
                            <form onSubmit={handleSubmit}>
                                <FormControl>
                                <Flex align="center">
                                    <Input
                                        type='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        bg='white'
                                        placeholder='Enter email addresse'
                                        mr={2}
                                        color='black'
                                    />
                                    <IconButton
                                        type='submit'
                                        colorScheme='blue'
                                        aria-label='Submit email'
                                        icon={<EmailIcon />}
                                    />
                                    </Flex>
                                </FormControl>
                            </form>
                        </Stack>
                    </SimpleGrid>
                </Container>
                <Box py={5} columns={{ base: 1, sm: 2, md: 4 }} spacing={8} marginLeft={'10'}>
                    <Stack>
                        <Text   >
                            © {new Date().getFullYear()} Your Company. All rights reserved.
                        </Text>
                    </Stack>
                </Box>
            </Box>
        </>
    );
}

const Logo = () => {
    const GlobalStyle = createGlobalStyle`
    /* Add your Bootstrap styles here */
    @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css');
    /* Add any other global styles if needed */
`;
    return (
        <>
            <GlobalStyle/>
            <Heading fontSize="30px" fontWeight="bolder" color="gold" mb={2}>
                WayCab
            </Heading>
        </>
    );
};

const ListHeader = ({ children }) => {
    const GlobalStyle = createGlobalStyle`
    /* Add your Bootstrap styles here */
    @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css');
    /* Add any other global styles if needed */
`;
    return (
        <>
            <GlobalStyle/>
            <Text fontWeight="500" fontSize="lg" mb={2}>
                {children}
            </Text>
        </>
    );
};

export default Footer;
