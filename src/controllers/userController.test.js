const userService = require('../services/userService');

describe('User Service', () => {
    //HandleLogin
    test('handleUserLogin should return errCode = 0 for valid email and password', async () => {
        const email = 'admin1';
        const password = '1';

        const userData = await userService.handleUserLogin(email, password);

        expect(userData.errCode).toBe(0);

    });

    test('handleUserLogin should return errCode = 1 for missing email or password', async () => {
        const email = 'admin1';


        const userData = await userService.handleUserLogin(email);

        expect(userData.errCode).toBe(1);

    });

    test('handleUserLogin should return errCode = 2 for wrong email', async () => {
        const email = 'admin12';
        const password = '1';

        const userData = await userService.handleUserLogin(email, password);

        expect(userData.errCode).toBe(2);

    });

    test('handleUserLogin should return errCode = 3 for wrong password', async () => {
        const email = 'admin1';
        const password = '2';

        const userData = await userService.handleUserLogin(email, password);

        expect(userData.errCode).toBe(3);

    });

    //handleGetAllUser
    test('handleGetAllUser should return errCode= 0 for get All user', async () => {
        const id = 'All'

        const userData = await userService.getAllUsers(id);

        expect(userData.errCode).toBe(0);

    });

    test('handleGetAllUser should return errCode= 0 for get user by valid Id', async () => {
        const id = '1'

        const userData = await userService.getAllUsers(id);

        expect(userData.errCode).toBe(0);

    });

    test('handleGetAllUser should return errCode= 1 for get user by invalid Id', async () => {
        const id = 'abc'

        const userData = await userService.getAllUsers(id);

        expect(userData.errCode).toBe(1);

    });

    //handleCreateNewUser

    test('handleCreateNewUser should return errCode= 0 for create a user with full valid value', async () => {
        const data = {
            email: 'test12345',
            password: '1',
            firstName: 'Chinh',
            lastName: 'Cong',
            address: 'Dong Nai',
            phoneNumber: '113',
            gender: 'G1',
            roleId: 'R1',
            image: '',
            districtId: 123,
        }

        const userData = await userService.createNewUser(data);

        expect(userData.errCode).toBe(0);

    });

    test('handleCreateNewUser should return errCode= 0 for create a user with an exist email', async () => {
        const data = {
            email: 'admin1',
            password: '1',
            firstName: 'Chinh',
            lastName: 'Cong',
            address: 'Dong Nai',
            phoneNumber: '113',
            gender: 'G1',
            roleId: 'R1',
            image: '',
            districtId: 123,
        }

        const userData = await userService.createNewUser(data);

        expect(userData.errCode).toBe(1);

    });

    //handleDeleteUser
    test('handleDeleteUser should return errCode= 0 for delete a user with a valid id', async () => {
        const id = 10


        const userData = await userService.deleteUser(id);

        expect(userData.errCode).toBe(0);

    });

    test('handleDeleteUser should return errCode=2  for not found user to delete ', async () => {
        const id = 123123


        const userData = await userService.deleteUser(id);

        expect(userData.errCode).toBe(2);

    });

    test('handleDeleteUser should return errCode=1  for missing id when delete user ', async () => {

        const userData = await userService.deleteUser();

        expect(userData.errCode).toBe(1);

    });

    //handleEditUser

    test('handleEditUser should return errCode=0  for edit user success ', async () => {
        const data = {
            id: 1,
            firstName: 'Ca',
            lastName: "Chua",
            address: "Dong Nai",
            roleId: 'R5',
            gender: "G3",
            phoneNumber: '113',
        }

        const userData = await userService.handleEditUser(data);

        expect(userData.errCode).toBe(0);

    });

    test('handleEditUser should return errCode=1  for missing information for edit ', async () => {
        //missing id account
        const data = {
            firstName: 'Ca',
            lastName: "Chua",
            address: "Dong Nai",
            roleId: 'R5',
            gender: "G3",
            phoneNumber: '113',
        }

        const userData = await userService.updateUserData(data);

        expect(userData.errCode).toBe(1);

    });

    test('handleEditUser should return errCode=2  for not found the data of this user in db ', async () => {

        const data = {
            id: 123344,
            firstName: 'Ca',
            lastName: "Chua",
            address: "Dong Nai",
            roleId: 'R5',
            gender: "G3",
            phoneNumber: '113',
        }

        const userData = await userService.updateUserData(data);

        expect(userData.errCode).toBe(2);

    });


    //getAllCode
    test('getAllCode should return errCode=0  for valid type ', async () => {

        const type = 'ROLE'

        const userData = await userService.getAllCodeService(type);

        expect(userData.errCode).toBe(0);

    });

    test('getAllCode should return errCode=1  for missing type ', async () => {



        const userData = await userService.getAllCodeService();

        expect(userData.errCode).toBe(1);

    });

    test('getAllCode should return errCode=2  for wrong type ', async () => {

        const type = 'HELLOWORLD'

        const userData = await userService.getAllCodeService(type);

        expect(userData.errCode).toBe(2);

    });

    //getProvince
    test('getProvince should return errCode=0  for succes get data ', async () => {


        const userData = await userService.getProvinceService();

        expect(userData.errCode).toBe(0);

    });


    //getDistrict
    test('getDistrict should return errCode=0  for succes get data with valid ProvinceId', async () => {

        const provinceId = 44

        const userData = await userService.getDistrictService(provinceId);

        expect(userData.errCode).toBe(0);

    });

    test('getDistrict should return errCode=1  for missing ProvinceId', async () => {



        const userData = await userService.getDistrictService();

        expect(userData.errCode).toBe(1);

    });

    //handleCreateNewWarehouse
    test('handleCreateNewWarehouse should return errCode=0  for success create warehouse', async () => {

        const data = {
            name: 'Kho',
            address: 'Dong Nai',
            phoneNumber: '123',
            districtName: 'Long Thanh',
            provinceName: 'Dong Nai',
            addressCoordinate: { lat: 123.123, lng: 23.23 },
            districtId: 123
        }

        const userData = await userService.createNewWarehouse(data);

        expect(userData.errCode).toBe(0);

    });

    test('handleCreateNewWarehouse should return errCode=2  for create warehouse that already created on database', async () => {

        const data = {
            name: 'Kho',
            address: 'Dong Nai',
            phoneNumber: '123',
            districtName: 'Long Thanh',
            provinceName: 'Dong Nai',
            addressCoordinate: { lat: 123.123, lng: 23.23 },
            districtId: 123
        }

        const userData = await userService.createNewWarehouse(data);

        expect(userData.errCode).toBe(2);

    });

    //getFee
    test('getFee should return errCode=0  for getting all Fee', async () => {

        const userData = await userService.getFeeService();

        expect(userData.errCode).toBe(0);

    });

    //handleCreateOrder
    test('handleCreateOrder should return errCode=0  for create an order with valid value', async () => {
        let data = {
            userId: 1,
            takeName: "Chinh",
            takeAddress: 'Dong Nai',
            takePhone: '113',
            takeProvince: 'DongNai',
            takeDistrict: 'Long Thanh',
            takeTime: '123',
            receivePhone: '12334',
            receiverName: 'Khach',
            receiverAddress: 'Sai Gon',
            receiveProvince: 'Thanh Pho Ho CHi Minh',
            receiveDistrict: 'Thanh pho thu duc',
            arrProduct: '',
            imagePackage: '',
            totalWeight: 120,
            CODCost: 999,
            totalCost: 999,
            note: '',
            noteOption: 'N1',
            payOption: 'P1',
            fee: 123,
            status: 'S2',
            warehouseId: 2
        }
        const userData = await userService.createOrder(data);

        expect(userData.errCode).toBe(0);

    });

    test('handleCreateOrder should return errCode=1  for create an order without user Id', async () => {
        let data = {
            takeName: "Chinh",
            takeAddress: 'Dong Nai',
            takePhone: '113',
            takeProvince: 'DongNai',
            takeDistrict: 'Long Thanh',
            takeTime: new Date(),
            receivePhone: '12334',
            receiverName: 'Khach',
            receiverAddress: 'Sai Gon',
            receiveProvince: 'Thanh Pho Ho CHi Minh',
            receiveDistrict: 'Thanh pho thu duc',
            arrProduct: '',
            imagePackage: '',
            totalWeight: 120,
            CODCost: 999,
            totalCost: 999,
            note: '',
            noteOption: 'N1',
            payOption: 'P1',
            fee: 123,
            status: 'S2',
            warehouseId: 2
        }
        const userData = await userService.createOrder(data);

        expect(userData.errCode).toBe(1);

    });

    //handleGetUserOrder
    test('handleGetUserOrder should return errCode=0  for get all user order', async () => {
        const data = {
            id: 1,
            status: 'S2'
        }

        const userData = await userService.getUserOrderService(data);

        expect(userData.errCode).toBe(0);

    });

    test('handleGetUserOrder should return errCode=1  missing parameter', async () => {
        const data = {
            id: 1,

        }

        const userData = await userService.getUserOrderService(data);

        expect(userData.errCode).toBe(1);

    });

    //updateProductStatus

    test('updateProductStatus should return errCode=0  for update status succes', async () => {
        const data = {
            orderId: 3,
            orderStatus: 'S1'
        }

        const userData = await userService.updateProductStatus(data);

        expect(userData.errCode).toBe(0);

    });

    test('updateProductStatus should return errCode=1  missing parameter', async () => {
        const data = {
            orderId: 3
        }

        const userData = await userService.updateProductStatus(data);

        expect(userData.errCode).toBe(1);

    });

    //handleGetOrderHistory
    test('handleGetOrderHistory should return errCode=0  for get order history success', async () => {
        const id = 3

        const userData = await userService.getOrderHistory(id);

        expect(userData.errCode).toBe(0);

    });

    test('handleGetOrderHistory should return errCode=1  not found history', async () => {
        const id = 333

        const userData = await userService.getOrderHistory(id);

        expect(userData.errCode).toBe(1);

    });

    //handleGetNearestWarehouse
    test('handleGetNearestWarehouse should return errCode=0  if have warehouse near your location', async () => {
        const data = {
            lat: 10.7613143,
            lng: 107.0206345
        }

        const userData = await userService.getNearestWarehouse(data);

        expect(userData.errCode).toBe(0);

    });

    test('handleGetNearestWarehouse should return errCode=1  if have none warehouse near your location', async () => {
        const data = {
            lat: 101.7613143,
            lng: 101.0206345
        }

        const userData = await userService.getNearestWarehouse(data);

        expect(userData.errCode).toBe(1);

    });

});