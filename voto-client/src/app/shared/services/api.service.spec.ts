import { async, getTestBed, TestBed } from "@angular/core/testing";
import { 
  Http, Response, ResponseOptions, BaseRequestOptions, Headers, 
  URLSearchParams, RequestMethod } from "@angular/http";
import { MockBackend, MockConnection } from "@angular/http/testing";

import { environment } from "./../../../environments/environment";
import { ApiService, TokenService } from "./";

describe("Service: ApiService", () => {
  let backend: MockBackend;
  let tokenService: TokenService;
  let apiService: ApiService;
  let requestUrl: string;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        ApiService,
        TokenService,
        BaseRequestOptions,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          }
        }
      ]
    });

    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    tokenService = new TokenService();
    apiService = testbed.get(ApiService);
    requestUrl = "test";

  }));

  function setupConnections(backend: MockBackend, options: any) {
    backend.connections.subscribe(
      (connection: MockConnection) => {
        const responseOptions = new ResponseOptions(options);
        const response = new Response(responseOptions);

        connection.mockRespond(response);
      });
  }

  it("should GET a resource", () => {
    setupConnections(backend, { body: [1,2,3] });
    let params = new URLSearchParams();
    
    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toBe(RequestMethod.Get);
      expect(connection.request.url).toBe(environment.apiUrl + requestUrl);
    });

    apiService.get(requestUrl, params);
  });

  it("should POST to a resource", () => {
    setupConnections(backend, { body: [1,2,3] });

    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toBe(RequestMethod.Post);
      expect(connection.request.url).toBe(environment.apiUrl + requestUrl);
    });

    apiService.post(requestUrl, { title: "test" });
  });

  it("should DELETE a resource", () => {
    setupConnections(backend, { body: [1,2,3] });

    backend.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.method).toBe(RequestMethod.Delete);
      expect(connection.request.url).toBe(environment.apiUrl + requestUrl);
    });

    apiService.delete(requestUrl);
  });

});
