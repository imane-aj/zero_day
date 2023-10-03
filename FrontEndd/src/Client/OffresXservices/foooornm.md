    <div className="row justify-content-center ">
                <div class="col-lg-7 pt-5 pt-lg-0 order-2 order-lg-1 d-flex align-items-center">


                    <form style={{ width: '100%' }} data-aos="zoom-in"  marginBottom={'10%'}>
                        <div className="form-group" style={{ marginBottom: '20px', marginTop :'20px'}}>
                            <FormControl id="depart"  >
                                {isLoaded && (<Autocomplete onPlaceChanged={(place) => setDepart(place)}
                                >
                                    <InputGroup >
                                        {/* <FormLabel width='20%' marginTop={1} pointerEvents='none' fontWeight="bold" color={'black'}>
                                        Départ:
                                    </FormLabel> */}

                                        <Input
                                            placeholder="Addresse de Départ"
                                            bg={isFocused ? "transparent" : "transparent"}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            className="form-control rounded-pill mr-1"

                                            py="2"
                                            pl="3"
                                            pr="5"
                                            borderColor="transparent" // Set border color to transparent
                                            boxShadow="none" // Remove the box shadow\
                                            ref={originRef}
                                        />

                                    </InputGroup>
                                </Autocomplete>)}
                            </FormControl>
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <FormControl id="arrive"  >
                                {isLoaded && (<Autocomplete >
                                    <InputGroup>
                                        {/* <FormLabel width='20%' marginTop={1} pointerEvents='none' fontWeight="bold" color={'black'}>
                                        Arrivée:
                                    </FormLabel> */}



                                        <Input
                                            placeholder="Addresse de Destination" // Add your placeholder text here
                                            bg={isFocused ? "transparent" : "transparent"}
                                            onFocus={handleFocus}
                                            onBlur={handleBlur}
                                            className="form-control rounded-pill mr-1"
                                            // value={arrive}
                                            // onChange={(e) => setArrive(e.target.value)}

                                            py="2"
                                            pl="3"
                                            pr="5"
                                            borderColor="transparent"
                                            boxShadow="none"
                                            ref={destinationRef}
                                        />



                                    </InputGroup>
                                </Autocomplete>)}
                            </FormControl>

                   

                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: '20px' }}>
                             

                                            <div>
                                            <Button
                                     onClick={calculateDistance}
                                        
                                        fontWeight="bold"
                            className="rounded-pill"
                            bgColor="yellow"
                                    >
                                       Voir le chemin
                                    </Button>
                                            </div>


                            </div>
                       
                        <div className="form-group" >
                            <div className="form-group input-group" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div className="form-group input-group mb-3" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <Button
                                        onClick={() => handleTrajet()}
                                        className="form-control rounded-pill"
                                        style={selectedTrajet === false ? selectedButtonStyle : buttonStyle}
                                    >
                                        sans arrêt
                                    </Button>
                                    <Button
                                        onClick={() => handleTrajetSelection()}
                                        className="form-control rounded-pill"
                                        style={selectedTrajet === true ? selectedButtonStyle : buttonStyle}
                                    >
                                        avec arrêt
                                    </Button>
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: '20px' }}>
                                {selectedTrajet &&
                                    (
                                        <>

                                            <div>

                                                <input
                                                    style={{ width: '120%' }}
                                                    id="arret"
                                                    className="form-control"
                                                    type="text"
                                                    placeholder="Combien d'heures ?" // Add your placeholder text here

                                                    value={selectedTime}
                                                    onChange={(e) => setselectedTime(e.target.value)}
                                              
                                                    required
                                                />
                                            </div>


                                        </>
                                    )}
                            </div>
                        </div>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <div className="form-group input-group " style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Button
                                    onClick={() => handleType("Immédiate")}

                                    className=" form-control rounded-pill"

                                    style={type === "Immédiate" ? selectedButtonStyle : buttonStyle}
                                >
                                    Immediate
                                </Button>
                                <Button
                                    onClick={() => handleTypeSelection("plus tard")}
                                    className="form-control rounded-pill"
                                    style={type === "plus tard" ? selectedButtonStyle : buttonStyle}
                                >
                                    Plus tard
                                </Button>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

                            {type === "plus tard" &&
                                (
                                    <>

                                        <div>

                                            <input
                                                id="pickupDate"
                                                className="form-control"
                                                type="datetime-local" // Use datetime-local type
                                                value={selectedDate}
                                                onChange={(e) => setselectedDate(e.target.value)}
                                            
                                                required
                                            />
                                        </div>


                                    </>
                                )}
                        </div>
                        {isLoaded && (<GoogleMap
                                mapContainerStyle={containerStyle}
                                center={center}
                                zoom={10}
                                onLoad={(map) => setMap(map)}
                                style={{ marginBottom: '20px', marginTop :'20px'}}
                            >
                                { /* Child components, such as markers, info windows, etc. */}
                                <Marker position={center} />
                             { directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
                            </GoogleMap>
                            )}
                      
                        <Box position='absolute' left='0' right='0' h='100%' w='100%' paddingTop={'20px'} paddingBottom={'20px'}>
                        <Button
                            onClick={submitHandler}
                            fontWeight="bold"
                            className="rounded-pill"
                            bgColor="yellow"
                            style={{ width: "100%", marginTop: type === "plus tard" ? "20px" : 0 }}
                        >
                            Commandez
                        </Button>

                        </Box>
                    </form>

                </div>
            </div>