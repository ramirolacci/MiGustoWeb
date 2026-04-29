import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import {
  adminPromocionesService,
  getProductService,
} from '../services/adminService';
import {
  sliderService,
  promosDestacadasService,
  combosImperdiblesService,
} from '../services/sliderService';
import type { AdminProduct, AdminPromocion } from '../services/adminService';
import type { MobilePromoSlide } from '../services/sliderService';

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'productos' | 'promociones' | 'sliders'>('productos');
  const [selectedCategory, setSelectedCategory] = useState<string>('Empanadas');
  const [editingItem, setEditingItem] = useState<AdminProduct | AdminPromocion | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string>('');
  const [sliderType, setSliderType] = useState<'home' | 'destacadas' | 'combos'>('home');
  const [editingSlider, setEditingSlider] = useState<{ id: string; image: string; title?: string; productName?: string; price?: string; href?: string } | null>(null);
  const [desktopSlides, setDesktopSlides] = useState<string[]>([]);
  const [mobileSlides, setMobileSlides] = useState<string[]>([]);

  const categories = ['Empanadas', 'Pizzas', 'Pizzas INDI', 'Fitzzas', 'Salsas', 'Postres'];

  // Cargar slides al montar
  useEffect(() => {
    if (activeTab === 'sliders') {
      setDesktopSlides(sliderService.getDesktopSlides());
      setMobileSlides(sliderService.getMobileSlides());
    }
  }, [activeTab]);

  // Verificar autenticación
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('admin_authenticated') === 'true';
    const loginTime = localStorage.getItem('admin_login_time');
    
    if (!isAuthenticated || !loginTime) {
      navigate('/admin');
      return;
    }

    // Verificar si la sesión expiró (24 horas)
    const sessionTime = parseInt(loginTime, 10);
    const now = Date.now();
    const hoursSinceLogin = (now - sessionTime) / (1000 * 60 * 60);
    
    if (hoursSinceLogin > 24) {
      localStorage.removeItem('admin_authenticated');
      localStorage.removeItem('admin_login_time');
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_login_time');
    navigate('/admin');
  };

  const isAdminProduct = (item: AdminProduct | AdminPromocion): item is AdminProduct => {
    // Los productos tienen categoria (las promos no)
    return 'categoria' in item;
  };

  const getCurrentItems = (): (AdminProduct | AdminPromocion)[] => {
    if (activeTab === 'promociones') {
      return adminPromocionesService.getAll();
    }
    const service = getProductService(selectedCategory);
    return service.getAll();
  };

  const handleEdit = (item: AdminProduct | AdminPromocion) => {
    setEditingItem({ ...item });
    setIsAddingNew(false);
  };

  const handleAddNew = () => {
    if (activeTab === 'promociones') {
      setEditingItem({
        id: '',
        titulo: '',
        descripcion: '',
        imagen: '',
        precio: 0,
        esRecomendado: false,
      });
    } else {
      setEditingItem({
        id: '',
        titulo: '',
        descripcion: '',
        imagen: '',
        categoria: selectedCategory,
        precio: 0,
      });
    }
    setIsAddingNew(true);
  };

  const handleSave = () => {
    if (!editingItem) return;

    if (activeTab === 'promociones') {
      const promo = editingItem as AdminPromocion;
      if (isAddingNew) {
        adminPromocionesService.add(promo);
      } else {
        adminPromocionesService.update(promo.id!, promo);
      }
    } else {
      const product = editingItem as AdminProduct;
      const service = getProductService(selectedCategory);
      if (isAddingNew) {
        service.add(product);
      } else {
        service.update(product.id!, product);
      }
    }

    setSaveMessage('Cambios guardados correctamente');
    setTimeout(() => setSaveMessage(''), 3000);
    setEditingItem(null);
    setIsAddingNew(false);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este elemento?')) return;

    if (activeTab === 'promociones') {
      adminPromocionesService.delete(id);
    } else {
      const service = getProductService(selectedCategory);
      service.delete(id);
    }

    setSaveMessage('Elemento eliminado correctamente');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleDeleteSlider = (id: string, type: 'destacadas' | 'combos') => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este slider?')) return;

    if (type === 'destacadas') {
      promosDestacadasService.delete(id);
    } else {
      combosImperdiblesService.delete(id);
    }

    setSaveMessage('Slider eliminado correctamente');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingItem) {
          setEditingItem({
            ...editingItem,
            imagen: reader.result as string,
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const items: (AdminProduct | AdminPromocion)[] =
    activeTab === 'sliders' ? [] : getCurrentItems();

  return (
    <div className="admin-panel-container">
      <div className="admin-panel-header">
        <h1>Panel de Administración - Mi Gusto</h1>
        <button onClick={handleLogout} className="logout-button">
          Cerrar Sesión
        </button>
      </div>

      {saveMessage && (
        <div className="save-message success">
          {saveMessage}
        </div>
      )}

      <div className="admin-tabs">
        <button
          className={activeTab === 'productos' ? 'active' : ''}
          onClick={() => setActiveTab('productos')}
        >
          Productos
        </button>
        <button
          className={activeTab === 'promociones' ? 'active' : ''}
          onClick={() => setActiveTab('promociones')}
        >
          Promociones
        </button>
        <button
          className={activeTab === 'sliders' ? 'active' : ''}
          onClick={() => setActiveTab('sliders')}
        >
          Sliders
        </button>
      </div>

      {activeTab === 'productos' && (
        <div className="category-selector">
          <label htmlFor="category-select">Categoría:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      )}

      {activeTab === 'sliders' && (
        <div className="slider-type-selector">
          <label htmlFor="slider-type-select">Tipo de Slider:</label>
          <select
            id="slider-type-select"
            value={sliderType}
            onChange={(e) => setSliderType(e.target.value as 'home' | 'destacadas' | 'combos')}
            className="slider-type-select"
          >
            <option value="home">Sliders Home (Desktop/Mobile)</option>
            <option value="destacadas">Promociones Destacadas</option>
            <option value="combos">Combos Imperdibles</option>
          </select>
        </div>
      )}

      {(activeTab === 'productos' || activeTab === 'promociones') && (
        <div className="admin-content">
          <div className="items-list">
            <div className="items-header">
              <h2>{activeTab === 'promociones' ? 'Promociones' : selectedCategory}</h2>
              <button onClick={handleAddNew} className="add-button">
                + Agregar Nuevo
              </button>
            </div>

            <div className="items-grid">
              {items.map((item) => (
                <div key={item.id} className="item-card">
                  <div className="item-image">
                    <img src={item.imagen} alt={item.titulo} />
                  </div>
                  <div className="item-info">
                    <h3>{item.titulo}</h3>
                    <p className="item-description">{item.descripcion}</p>
                    {activeTab === 'promociones' && 'precio' in item && (
                      <p className="item-price">
                        $
                        {typeof item.precio === 'number'
                          ? item.precio.toLocaleString('es-AR')
                          : item.precio}
                      </p>
                    )}
                  </div>
                  <div className="item-actions">
                    <button onClick={() => handleEdit(item)} className="edit-button">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(item.id!)} className="delete-button">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {editingItem && (
            <div className="edit-panel">
              <div className="edit-panel-header">
                <h2>{isAddingNew ? 'Agregar Nuevo' : 'Editar'}</h2>
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setIsAddingNew(false);
                  }}
                  className="close-button"
                >
                  ×
                </button>
              </div>

              <div className="edit-form">
                <div className="form-group">
                  <label>Título:</label>
                  <input
                    type="text"
                    value={editingItem.titulo}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, titulo: e.target.value })
                    }
                    placeholder="Nombre del producto/promoción"
                  />
                </div>

                <div className="form-group">
                  <label>Descripción:</label>
                  <textarea
                    value={editingItem.descripcion}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, descripcion: e.target.value })
                    }
                    placeholder="Descripción del producto/promoción"
                    rows={4}
                  />
                </div>

                {activeTab === 'promociones' && (
                  <div className="form-group">
                    <label>Precio:</label>
                    <input
                      type="number"
                      value={'precio' in editingItem ? editingItem.precio : ''}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          precio: parseFloat(e.target.value) || 0,
                        })
                      }
                      placeholder="Precio en pesos"
                      min="0"
                      step="0.01"
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>URL de Imagen:</label>
                  <input
                    type="text"
                    value={editingItem.imagen}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, imagen: e.target.value })
                    }
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                </div>

                <div className="form-group">
                  <label>O subir imagen:</label>
                  <input type="file" accept="image/*" onChange={handleImageChange} />
                </div>

                {editingItem.imagen && (
                  <div className="image-preview">
                    <img src={editingItem.imagen} alt="Preview" />
                  </div>
                )}

                {activeTab === 'productos' && isAdminProduct(editingItem) && (
                  <>
                    <div className="form-group checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={editingItem.esRecomendado || false}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              esRecomendado: e.target.checked,
                            })
                          }
                        />
                        Recomendado
                      </label>
                    </div>

                    <div className="form-group checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={editingItem.esVegetariano || false}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              esVegetariano: e.target.checked,
                            })
                          }
                        />
                        Vegetariano
                      </label>
                    </div>

                    <div className="form-group checkbox-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={editingItem.esSinGluten || false}
                          onChange={(e) =>
                            setEditingItem({
                              ...editingItem,
                              esSinGluten: e.target.checked,
                            })
                          }
                        />
                        Sin Gluten
                      </label>
                    </div>
                  </>
                )}

                {activeTab === 'promociones' && (
                  <div className="form-group checkbox-group">
                    <label>
                      <input
                        type="checkbox"
                        checked={editingItem.esRecomendado || false}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            esRecomendado: e.target.checked,
                          })
                        }
                      />
                      Recomendado
                    </label>
                  </div>
                )}

                <div className="form-actions">
                  <button onClick={handleSave} className="save-button">
                    Guardar
                  </button>
                  <button
                    onClick={() => {
                      setEditingItem(null);
                      setIsAddingNew(false);
                    }}
                    className="cancel-button"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'sliders' && (
        <div className="admin-content">
          <div className="sliders-section">
            <div className="items-list">
              <div className="items-header">
                <h2>
                  {sliderType === 'home' && 'Sliders Home'}
                  {sliderType === 'destacadas' && 'Promociones Destacadas'}
                  {sliderType === 'combos' && 'Combos Imperdibles'}
                </h2>
                {sliderType !== 'home' && (
                  <button
                    onClick={() => {
                      const newSlide: MobilePromoSlide = {
                        id: `slide-${Date.now()}`,
                        image: '',
                        title: '',
                        productName: '',
                        price: '',
                      };
                      setEditingSlider(newSlide);
                      setIsAddingNew(true);
                    }}
                    className="add-button"
                  >
                    + Agregar Nuevo
                  </button>
                )}
              </div>

              <div className="items-grid">
                {sliderType === 'home' && (
                  <>
                    <div className="slider-group">
                      <h3>Sliders Desktop</h3>
                      {desktopSlides.map((slide, index) => (
                        <div key={index} className="item-card">
                          <div className="item-image">
                            <img src={slide} alt={`Slide ${index + 1}`} />
                          </div>
                          <div className="item-info">
                            <p>Slide {index + 1}</p>
                          </div>
                          <div className="item-actions">
                            <button
                              onClick={() => {
                                const newSlides = [...desktopSlides];
                                newSlides[index] = prompt('Ingresa la nueva URL de la imagen:', slide) || slide;
                                setDesktopSlides(newSlides);
                                sliderService.saveDesktopSlides(newSlides);
                                setSaveMessage('Sliders desktop guardados');
                                setTimeout(() => setSaveMessage(''), 3000);
                              }}
                              className="edit-button"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('¿Eliminar este slide?')) {
                                  const newSlides = desktopSlides.filter((_, i) => i !== index);
                                  setDesktopSlides(newSlides);
                                  sliderService.saveDesktopSlides(newSlides);
                                  setSaveMessage('Slide eliminado');
                                  setTimeout(() => setSaveMessage(''), 3000);
                                }
                              }}
                              className="delete-button"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const url = prompt('Ingresa la URL de la nueva imagen:');
                          if (url) {
                            const newSlides = [...desktopSlides, url];
                            setDesktopSlides(newSlides);
                            sliderService.saveDesktopSlides(newSlides);
                            setSaveMessage('Slide agregado');
                            setTimeout(() => setSaveMessage(''), 3000);
                          }
                        }}
                        className="add-slide-button"
                      >
                        + Agregar Slide Desktop
                      </button>
                    </div>

                    <div className="slider-group">
                      <h3>Sliders Mobile</h3>
                      {mobileSlides.map((slide, index) => (
                        <div key={index} className="item-card">
                          <div className="item-image">
                            <img src={slide} alt={`Slide ${index + 1}`} />
                          </div>
                          <div className="item-info">
                            <p>Slide {index + 1}</p>
                          </div>
                          <div className="item-actions">
                            <button
                              onClick={() => {
                                const newSlides = [...mobileSlides];
                                newSlides[index] = prompt('Ingresa la nueva URL de la imagen:', slide) || slide;
                                setMobileSlides(newSlides);
                                sliderService.saveMobileSlides(newSlides);
                                setSaveMessage('Sliders mobile guardados');
                                setTimeout(() => setSaveMessage(''), 3000);
                              }}
                              className="edit-button"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm('¿Eliminar este slide?')) {
                                  const newSlides = mobileSlides.filter((_, i) => i !== index);
                                  setMobileSlides(newSlides);
                                  sliderService.saveMobileSlides(newSlides);
                                  setSaveMessage('Slide eliminado');
                                  setTimeout(() => setSaveMessage(''), 3000);
                                }
                              }}
                              className="delete-button"
                            >
                              Eliminar
                            </button>
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={() => {
                          const url = prompt('Ingresa la URL de la nueva imagen:');
                          if (url) {
                            const newSlides = [...mobileSlides, url];
                            setMobileSlides(newSlides);
                            sliderService.saveMobileSlides(newSlides);
                            setSaveMessage('Slide agregado');
                            setTimeout(() => setSaveMessage(''), 3000);
                          }
                        }}
                        className="add-slide-button"
                      >
                        + Agregar Slide Mobile
                      </button>
                    </div>
                  </>
                )}

                {sliderType === 'destacadas' && promosDestacadasService.getAll().map((promo) => (
                  <div key={promo.id} className="item-card">
                    <div className="item-image">
                      <img src={promo.image} alt={promo.title || 'Promo'} />
                    </div>
                    <div className="item-info">
                      <h3>{promo.title || 'Sin título'}</h3>
                      {promo.productName && <p>{promo.productName}</p>}
                      {promo.price && <p className="item-price">{promo.price}</p>}
                    </div>
                    <div className="item-actions">
                      <button
                        onClick={() => {
                          setEditingSlider({ ...promo });
                          setIsAddingNew(false);
                        }}
                        className="edit-button"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteSlider(promo.id, 'destacadas')}
                        className="delete-button"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}

                {sliderType === 'combos' && combosImperdiblesService.getAll().map((combo) => (
                  <div key={combo.id} className="item-card">
                    <div className="item-image">
                      <img src={combo.image} alt={combo.title || 'Combo'} />
                    </div>
                    <div className="item-info">
                      <h3>{combo.title || 'Sin título'}</h3>
                      {combo.productName && <p>{combo.productName}</p>}
                      {combo.price && <p className="item-price">{combo.price}</p>}
                    </div>
                    <div className="item-actions">
                      <button
                        onClick={() => {
                          setEditingSlider({ ...combo });
                          setIsAddingNew(false);
                        }}
                        className="edit-button"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeleteSlider(combo.id, 'combos')}
                        className="delete-button"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {editingSlider && (
              <div className="edit-panel">
                <div className="edit-panel-header">
                  <h2>{isAddingNew ? 'Agregar Nuevo' : 'Editar'} Slider</h2>
                  <button onClick={() => { setEditingSlider(null); setIsAddingNew(false); }} className="close-button">
                    ×
                  </button>
                </div>

                <div className="edit-form">
                  {sliderType !== 'home' && (
                    <>
                      <div className="form-group">
                        <label>Título:</label>
                        <input
                          type="text"
                          value={editingSlider.title || ''}
                          onChange={(e) => setEditingSlider({ ...editingSlider, title: e.target.value })}
                          placeholder="Título del slider"
                        />
                      </div>

                      <div className="form-group">
                        <label>Nombre del Producto:</label>
                        <input
                          type="text"
                          value={editingSlider.productName || ''}
                          onChange={(e) => setEditingSlider({ ...editingSlider, productName: e.target.value })}
                          placeholder="Nombre del producto"
                        />
                      </div>

                      <div className="form-group">
                        <label>Precio:</label>
                        <input
                          type="text"
                          value={editingSlider.price || ''}
                          onChange={(e) => setEditingSlider({ ...editingSlider, price: e.target.value })}
                          placeholder="$0.000"
                        />
                      </div>

                      <div className="form-group">
                        <label>URL (opcional):</label>
                        <input
                          type="text"
                          value={editingSlider.href || ''}
                          onChange={(e) => setEditingSlider({ ...editingSlider, href: e.target.value })}
                          placeholder="https://..."
                        />
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <label>URL de Imagen:</label>
                    <input
                      type="text"
                      value={editingSlider.image}
                      onChange={(e) => setEditingSlider({ ...editingSlider, image: e.target.value })}
                      placeholder="https://ejemplo.com/imagen.jpg"
                    />
                  </div>

                  <div className="form-group">
                    <label>O subir imagen:</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditingSlider({
                              ...editingSlider,
                              image: reader.result as string,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </div>

                  {editingSlider.image && (
                    <div className="image-preview">
                      <img src={editingSlider.image} alt="Preview" />
                    </div>
                  )}

                  <div className="form-actions">
                    <button
                      onClick={() => {
                        if (sliderType === 'destacadas') {
                          if (isAddingNew) {
                            promosDestacadasService.add(editingSlider as MobilePromoSlide);
                          } else {
                            promosDestacadasService.update(editingSlider.id, editingSlider as MobilePromoSlide);
                          }
                        } else if (sliderType === 'combos') {
                          if (isAddingNew) {
                            combosImperdiblesService.add(editingSlider as MobilePromoSlide);
                          } else {
                            combosImperdiblesService.update(editingSlider.id, editingSlider as MobilePromoSlide);
                          }
                        }
                        setSaveMessage('Slider guardado correctamente');
                        setTimeout(() => setSaveMessage(''), 3000);
                        setEditingSlider(null);
                        setIsAddingNew(false);
                      }}
                      className="save-button"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={() => { setEditingSlider(null); setIsAddingNew(false); }}
                      className="cancel-button"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
