import {Flex,Card, CardBody,Image,Heading,Text} from "@chakra-ui/react";
 
const Tabs = () => {
    return(
        <>
        <Flex 
        wrap="wrap" 
        justify="center" 
        align="center"
        flexDirection="row"
        minW="100%"
        gap={6}
        bg="">
            <Card>
                <CardBody textAlign="center">
                    <Image
                    src="/src/assets/medicine1.png"
                    boxSize="10rem"
                    objectFit="cover" />
                    <Heading size="lg">Medicine A</Heading>
                    <Text>Dog Disease 1</Text>
                </CardBody>
            </Card>
            <Card>
                <CardBody textAlign="center">
                    <Image
                    src="/src/assets/medicine2.png"
                    boxSize="10rem"
                    objectFit="cover" />
                    <Heading size="lg">Medicine B</Heading>
                    <Text>Dog Disease 2</Text>
                </CardBody>
            </Card>
                <Card>
                <CardBody textAlign="center">
                    <Image
                    src="/src/assets/medicine3.png"
                    boxSize="10rem"
                    objectFit="cover" />
                    <Heading size="lg">Medicine C</Heading>
                    <Text>Dog Disease 3</Text>
                </CardBody>
                </Card>
                <Card>
                <CardBody textAlign="center">
                    <Image
                    src="/src/assets/medicine4.png"
                    boxSize="10rem"
                    objectFit="cover" />
                    <Heading size="lg">Medicine D</Heading>
                    <Text>Dog Disease 4</Text>
                </CardBody>
                </Card>
                <Card>
                <CardBody textAlign="center">
                    <Image
                    src="/src/assets/medicine5.png"
                    boxSize="10rem"
                    objectFit="cover" />
                    <Heading size="lg">Medicine E</Heading>
                    <Text>Dog Disease 5</Text>
                </CardBody>
                </Card>
                <Card>
                <CardBody textAlign="center">
                    <Image
                    src="/src/assets/medicine6.png"
                    boxSize="10rem"
                    objectFit="cover" />
                    <Heading size="lg">Medicine F</Heading>
                    <Text>Dog Disease 6</Text>
                </CardBody>
            </Card>
        </Flex>
        </>
    )
}
export default Tabs;